import "localenv"
import { IJwt, IJwtOptions } from "./../interfaces";

export const Jwt = ():any => {
    // return <IJwt> {
    //     secret: 'NpYBWYa2I3sS7',
    //     options: <IJwtOptions> {
    //         issuer:  'Typescript',
    //         subject:  'noreply@ts.com',
    //         audience:  'http://localhost/',
    //         expiresIn:  "12h",
    //         algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
    //     }
    // }
    return <IJwtOptions> {
            issuer:  'Typescript',
            subject:  'noreply@ts.com',
            audience:  'http://localhost/',
            expiresIn:  "12h",
            algorithm:  ["RS256"]   // RSASSA [ "RS256", "RS384", "RS512" ]
    }
}