import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as Config from "./../config";
import { IJwtOptions } from "./../interfaces";

// export class Jwt {
//     public data:any
//     private private:string
//     private public:string
//     public options:IJwtOptions
//     constructor(data:any, $options?:IJwtOptions) {
//         this.data = data
//         //key
//         this.key()
//         if(!$options){
//             this.options = Config.Jwt()
//         }else{
//             this.options.issuer = ($options.issuer) ? $options.issuer : this.options.issuer;
//             this.options.subject = ($options.subject) ? $options.subject : this.options.subject;
//             this.options.audience = ($options.audience) ? $options.audience : this.options.audience;
//             this.options.expiresIn = ($options.expiresIn) ? $options.expiresIn : this.options.expiresIn;
//             this.options.algorithm = ($options.algorithm) ? $options.algorithm : this.options.algorithm;
//         }
       
//     }
//     private key(){
//         try {
//             this.private = fs.readFileSync(`${__dirname}/../utils/private.key`, 'utf-8')
//             this.public = fs.readFileSync(`${__dirname}/../utils/public.key`, 'utf-8')
//         } catch (error) {
//             console.log(`error reading key: `, error)
//             throw error
//         }
//     }
//     public async sign(){
//         // Token signing options
//         let option = <IJwtOptions> {
//             issuer:  this.options.issuer,
//             subject:  this.options.subject,
//             audience:  this.options.audience,
//             expiresIn:  "30d",    // 30 days validity
//             algorithm:  "RS256"    
//         };
//         return await jwt.sign(
//             this.data, 
//             this.private,
//             option
//         );
//     }
//     public async verify(){
//         let option = <IJwtOptions> {
//             issuer:  this.options.issuer,
//             subject:  this.options.subject,
//             audience:  this.options.audience,
//             expiresIn:  "30d",
//             algorithm:  ["RS256"]
//         };
//         return await jwt.verify(
//             this.data, 
//             this.public,
//             option
//         );
//     }
//     public async decode(){
//         return await jwt.decode(
//             this.data, 
//             {
//                 complete: true
//             }
//         );
//     }
// }

export const Jwt = {
    sign : async (data:object):Promise<any> => {
        return new Promise(async (resolve, reject)=> {
            try {
                fs.readFile(`${__dirname}/../utils/private.key`, 'utf-8',async (error, result) => {
                    try {
                        if(error)
                            reject(error)
                        const config = await Config.Jwt();
                        config.algorithm = "RS256";
                        jwt.sign(data,result,config, (error,token) => {
                            if(error)
                                reject(error)

                            resolve(token)
                        });
                    } catch (error) {
                        reject(error)
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    },
    verify: async (token:string, publicKey?:string | Buffer):Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try{
                if(!publicKey){
                    fs.readFile(`${__dirname}/../utils/public.key`, 'utf-8', async (error, data) => {
                        if(error)
                            reject(error)
    
                        const config = await Config.Jwt();
                        jwt.verify(token, data,config, (error, decoded) => {
                            if(error)
                                reject(error)
                            resolve(decoded)
                        })
                    });
                }else{
                    const config = await Config.Jwt();
                    jwt.verify(token, publicKey,config, (error, decoded) => {
                        if(error)
                            reject(error)
                        resolve(decoded)
                    })
                }

            }catch(error) { 
                reject(error)
            }
        })
    },
    decode: async (token:string):Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await jwt.decode(
                    token, 
                    {
                        complete: true
                    }
                );
                resolve(result)
            } catch (error) {
                reject(error)
            }  
        })
    }
}