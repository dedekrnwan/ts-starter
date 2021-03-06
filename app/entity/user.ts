import * as mongoose from "mongoose";

export class User {
    constructor(){
        this.model = mongoose.model(this.name, this.schema);
    }

    public model:any
    public name:string = 'User'

    public schema:mongoose.Schema = new mongoose.Schema({
        email:String,
        username:String,
        name:String,
        birthdate:Date,
        password:String,
        phone:String,
        telephone:String,
        address:String,
        category:String,
        email_verify_date:Date,
        remember_token:String,
        created_date: {
            type: Date,
            "default": Date.now
        },
        created_by_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            "default": null
        },
        updated_date: {
            type: Date,
            "default": Date.now
        },
        updated_by_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            "default": null
        },
        license_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'license',
            "default": null
        },
    })
}