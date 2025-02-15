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
exports.TemperaturaController = void 0;
const common_1 = require("@nestjs/common");
const temperatura_service_1 = require("./temperatura.service");
let TemperaturaController = class TemperaturaController {
    constructor(temperaturaService) {
        this.temperaturaService = temperaturaService;
    }
    getTemperaturaAtual() {
        return this.temperaturaService.getTemperaturaAtual();
    }
    updateTemperaturaAtual(temperatura, statusAquecedor) {
        return this.temperaturaService.updateTemperaturaAtual(temperatura, statusAquecedor);
    }
    getTemperatureSettings() {
        return this.temperaturaService.getTemperaturaSettings();
    }
    updateTemperatureSettings(minTemperatura, maxTemperatura) {
        return this.temperaturaService.updateTemperaturaSettings(minTemperatura, maxTemperatura);
    }
};
exports.TemperaturaController = TemperaturaController;
__decorate([
    (0, common_1.Get)("current"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemperaturaController.prototype, "getTemperaturaAtual", null);
__decorate([
    (0, common_1.Post)("current"),
    __param(0, (0, common_1.Body)("temperatura")),
    __param(1, (0, common_1.Body)("statusAquecedor")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", void 0)
], TemperaturaController.prototype, "updateTemperaturaAtual", null);
__decorate([
    (0, common_1.Get)("settings"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemperaturaController.prototype, "getTemperatureSettings", null);
__decorate([
    (0, common_1.Put)("settings"),
    __param(0, (0, common_1.Body)("minTemperatura")),
    __param(1, (0, common_1.Body)("maxTemperatura")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TemperaturaController.prototype, "updateTemperatureSettings", null);
exports.TemperaturaController = TemperaturaController = __decorate([
    (0, common_1.Controller)("temperatura"),
    __metadata("design:paramtypes", [temperatura_service_1.TemperaturaService])
], TemperaturaController);
//# sourceMappingURL=temperatura.controller.js.map