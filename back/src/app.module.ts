import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TemperaturaController } from "./temperatura/temperatura.controller";
import { TemperaturaService } from "./temperatura/temperatura.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Temperatura, TemperaturaSchema } from "./schemas/temperatura.schema";
import { Settings, SettingsSchema } from "./schemas/settings.schema";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/aquecimento_aquario'),
    MongooseModule.forFeature([
      { name: Temperatura.name, schema: TemperaturaSchema },
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [AppController, TemperaturaController],
  providers: [AppService, TemperaturaService],
})
export class AppModule {}
