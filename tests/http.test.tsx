import App from "../lib/app";
import * as request from "supertest";
import * as mongoose from "mongoose";
import * as Controllers from "./../app/controller"

const app = new App().app;

describe('Accessing controllers', () => {
    [
        Controllers.WelcomeController
    ].forEach(controller => {
        const prefix = Reflect.getMetadata(`${controller.name}:prefix`, controller);
        const routes:Array<any> = Reflect.getMetadata(`${controller.name}:routes`, controller);
        routes.forEach((route:any) => {
            // router.route(`${route.path}`)[route.method]([...middlewares.before, handler, ...middlewares.after, ...middlewares.error]) 
            test(`Test of ${prefix}${route.path}, should get 200 or 401 status code`, async (done) => {
                await request(app).get(`${prefix}${route.path}`).then(async (response) => {
                    await mongoose.connection.close();
                    await expect(response.status == 200 || response.status == 401).toBeTruthy();
                    done();
                });
            });
        });
       
    })
})

