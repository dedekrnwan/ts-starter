import * as bcryptJs from "bcryptjs";
import * as fs from "fs";

export const bcryptjs = {
    hash : async (data:string):Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                let privateKey:string;
                fs.readFile(`${__dirname}/../utils/private.key`, (error, data) => {
                    if(error)
                        reject(error)
                    privateKey = data.toString('utf-8');
                })
                bcryptJs.hash(data, await bcryptJs.genSalt(10)).then((result) => {
                    resolve(result)
                }).catch((error) => {
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}