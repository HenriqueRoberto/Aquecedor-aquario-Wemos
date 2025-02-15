import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Settings extends Document {
  @Prop({ required: true })
  minTemperatura: number;

  @Prop({ required: true })
  maxTemperatura: number;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);