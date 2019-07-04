import { ConnectionOptions } from "typeorm";

export interface IMongoose{
    url:string,
    port:number,
    schema:string
}

export type ITypeOrm = ConnectionOptions