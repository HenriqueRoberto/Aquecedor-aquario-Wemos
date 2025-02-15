import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from 'src/schemas/settings.schema';
import { Temperatura } from 'src/schemas/temperatura.schema';

@Injectable()
export class TemperaturaService {
  constructor(
    @InjectModel(Temperatura.name) private temperaturaModel: Model<Temperatura>,
    @InjectModel(Settings.name) private settingsModel: Model<Settings>,
  ) {}

  // Retorna a temperatura atual
  async getTemperaturaAtual() {
    // Busca a última temperatura registrada no banco de dados
    const ultimaTemperatura = await this.temperaturaModel.findOne().sort({ horario: -1 }).exec();
  
    let temperatura: number;
    let statusAquecedor: boolean;
  
    if (ultimaTemperatura) {
      // Se houver um registro, pega a última temperatura e o status
      temperatura = ultimaTemperatura.temperatura;
      statusAquecedor = ultimaTemperatura.statusAquecedor;
    } else {
      // Caso não haja registros, gera uma temperatura aleatória
      temperatura = Math.random() * (30 - 20) + 20;
      statusAquecedor = temperatura < 23; // Exemplo: Ligar aquecedor se abaixo de 23°C
    }
  
    // Retorna a última temperatura ou a aleatória gerada
    return {
      temperatura: parseFloat(temperatura.toFixed(2)), // Temperatura com duas casas decimais
      horario: new Date(), // Hora da medição
      statusAquecedor, // Status do aquecedor
    };
  }

  // Atualiza a temperatura atual manualmente (se necessário)
  async updateTemperaturaAtual(temperatura: number, statusAquecedor: boolean) {
    const novaTemperatura = new this.temperaturaModel({
      temperatura,
      horario: new Date(),
      statusAquecedor,
    });

    await novaTemperatura.save(); // Salva no banco
    return { message: 'Temperatura atualizada', temperatura };
  }

  // Retorna os parâmetros de temperatura máxima e mínima configurados
  async getTemperaturaSettings() {
    let settings = await this.settingsModel.findOne();

    if (!settings) {
      // Se não existir configuração, cria uma padrão
      settings = new this.settingsModel({
        minTemperatura: 23.0,
        maxTemperatura: 24.0,
      });
      await settings.save();
    }

    return settings;
  }

  // Atualiza os parâmetros de temperatura máxima e mínima
  async updateTemperaturaSettings(minTemperatura: number, maxTemperatura: number) {
    await this.settingsModel.updateOne(
      {}, // Critério de busca
      { minTemperatura, maxTemperatura },
      { upsert: true }, // Atualiza ou cria se não existir
    );
  
    // Retorna o documento atualizado
    return this.settingsModel.findOne({});
  }
}