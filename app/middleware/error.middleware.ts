import * as express from "express"
import * as Helper from "./../helper"

export const Error = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    next(new Helper.Response().notFound(`Not Found`,{}));
}