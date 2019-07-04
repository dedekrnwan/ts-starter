import {  IMongoose, ITypeOrm } from "../interfaces";
import "localenv"

export const fractal:IMongoose = <IMongoose> {
    url: `${process.env.FRACTAL_DEFAULT_URL}:${process.env.FRACTAL_DEFAULT_PORT}/${process.env.FRACTAL_DEFAULT_SCHEMA}`,
    port: parseInt(process.env.FRACTAL_DEFAULT_PORT || '27017'),
    schema: process.env.FRACTAL_DEFAULT_SCHEMA,
}

export const cores:ITypeOrm = <ITypeOrm> {
    type: 'mysql',
    name: 'default',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'starter',
    synchronize: true,
    entities: ["./app/entity/*.ts"],
    // logging: true,
    migrations: ["./app/database/migration/**/*.ts"],
    cli: {
        migrationsDir: "migration"
    }
}