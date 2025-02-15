import { Document } from 'mongoose';
export declare class Temperatura extends Document {
    temperatura: number;
    horario: Date;
    statusAquecedor: boolean;
}
export declare const TemperaturaSchema: import("mongoose").Schema<Temperatura, import("mongoose").Model<Temperatura, any, any, any, Document<unknown, any, Temperatura> & Temperatura & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Temperatura, Document<unknown, {}, import("mongoose").FlatRecord<Temperatura>> & import("mongoose").FlatRecord<Temperatura> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
