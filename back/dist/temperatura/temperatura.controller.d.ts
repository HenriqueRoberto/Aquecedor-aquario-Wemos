import { TemperaturaService } from "./temperatura.service";
export declare class TemperaturaController {
    private readonly temperaturaService;
    constructor(temperaturaService: TemperaturaService);
    getTemperaturaAtual(): Promise<{
        temperatura: number;
        horario: Date;
        statusAquecedor: boolean;
    }>;
    updateTemperaturaAtual(temperatura: number, statusAquecedor: boolean): Promise<{
        message: string;
        temperatura: number;
    }>;
    getTemperatureSettings(): Promise<import("mongoose").Document<unknown, {}, import("../schemas/settings.schema").Settings> & import("../schemas/settings.schema").Settings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTemperatureSettings(minTemperatura: number, maxTemperatura: number): Promise<import("mongoose").Document<unknown, {}, import("../schemas/settings.schema").Settings> & import("../schemas/settings.schema").Settings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
