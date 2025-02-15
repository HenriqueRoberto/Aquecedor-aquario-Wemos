import { Model } from 'mongoose';
import { Settings } from 'src/schemas/settings.schema';
import { Temperatura } from 'src/schemas/temperatura.schema';
export declare class TemperaturaService {
    private temperaturaModel;
    private settingsModel;
    constructor(temperaturaModel: Model<Temperatura>, settingsModel: Model<Settings>);
    getTemperaturaAtual(): Promise<{
        temperatura: number;
        horario: Date;
        statusAquecedor: boolean;
    }>;
    updateTemperaturaAtual(temperatura: number, statusAquecedor: boolean): Promise<{
        message: string;
        temperatura: number;
    }>;
    getTemperaturaSettings(): Promise<import("mongoose").Document<unknown, {}, Settings> & Settings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTemperaturaSettings(minTemperatura: number, maxTemperatura: number): Promise<import("mongoose").Document<unknown, {}, Settings> & Settings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
