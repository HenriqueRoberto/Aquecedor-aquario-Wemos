"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperaturaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const settings_schema_1 = require("../schemas/settings.schema");
const temperatura_schema_1 = require("../schemas/temperatura.schema");
let TemperaturaService = class TemperaturaService {
    constructor(temperaturaModel, settingsModel) {
        this.temperaturaModel = temperaturaModel;
        this.settingsModel = settingsModel;
    }
    async getTemperaturaAtual() {
        const ultimaTemperatura = await this.temperaturaModel.findOne().sort({ horario: -1 }).exec();
        let temperatura;
        let statusAquecedor;
        if (ultimaTemperatura) {
            temperatura = ultimaTemperatura.temperatura;
            statusAquecedor = ultimaTemperatura.statusAquecedor;
        }
        else {
            temperatura = Math.random() * (30 - 20) + 20;
            statusAquecedor = temperatura < 23;
        }
        return {
            temperatura: parseFloat(temperatura.toFixed(2)),
            horario: new Date(),
            statusAquecedor,
        };
    }
    async updateTemperaturaAtual(temperatura, statusAquecedor) {
        const novaTemperatura = new this.temperaturaModel({
            temperatura,
            horario: new Date(),
            statusAquecedor,
        });
        await novaTemperatura.save();
        return { message: 'Temperatura atualizada', temperatura };
    }
    async getTemperaturaSettings() {
        let settings = await this.settingsModel.findOne();
        if (!settings) {
            settings = new this.settingsModel({
                minTemperatura: 23.0,
                maxTemperatura: 24.0,
            });
            await settings.save();
        }
        return settings;
    }
    async updateTemperaturaSettings(minTemperatura, maxTemperatura) {
        await this.settingsModel.updateOne({}, { minTemperatura, maxTemperatura }, { upsert: true });
        return this.settingsModel.findOne({});
    }
};
exports.TemperaturaService = TemperaturaService;
exports.TemperaturaService = TemperaturaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(temperatura_schema_1.Temperatura.name)),
    __param(1, (0, mongoose_1.InjectModel)(settings_schema_1.Settings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TemperaturaService);
//# sourceMappingURL=temperatura.service.js.map