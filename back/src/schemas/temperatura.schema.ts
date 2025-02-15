import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Adiciona createdAt automaticamente
export class Temperatura extends Document {
  @Prop({ required: true })
  temperatura: number;

  @Prop({ required: true })
  horario: Date;

  @Prop({ required: true })
  statusAquecedor: boolean;
}

export const TemperaturaSchema = SchemaFactory.createForClass(Temperatura);