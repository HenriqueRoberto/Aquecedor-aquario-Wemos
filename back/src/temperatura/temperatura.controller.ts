import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { TemperaturaService } from "./temperatura.service";

@Controller("temperatura")
export class TemperaturaController {
  constructor(private readonly temperaturaService: TemperaturaService) {}

  // Retorna a temperatura atual // FRONT vai usar
  @Get("current")
  getTemperaturaAtual() {
    return this.temperaturaService.getTemperaturaAtual();
  }

  // Atualiza a temperatura atual // usado pelo sistema embarcado para enviar a temperatura
  @Post("current")
  updateTemperaturaAtual(
    @Body("temperatura") temperatura: number,
    @Body("statusAquecedor") statusAquecedor: boolean
  ) {
    return this.temperaturaService.updateTemperaturaAtual(
      temperatura,
      statusAquecedor
    );
  }

  // Retorna os parâmetros de temperatura máxima e mínima configurados
  @Get("settings")
  getTemperatureSettings() {
    return this.temperaturaService.getTemperaturaSettings();
  }

  // Atualiza os parâmetros de temperatura máxima e mínima
  @Put("settings")
  updateTemperatureSettings(
    @Body("minTemperatura") minTemperatura: number,
    @Body("maxTemperatura") maxTemperatura: number
  ) {
    return this.temperaturaService.updateTemperaturaSettings(
      minTemperatura,
      maxTemperatura
    );
  }
}
