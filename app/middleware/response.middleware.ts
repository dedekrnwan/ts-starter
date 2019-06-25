import * as express from "express";
import { IResponse } from "./../interfaces/response.interface";
import { Error } from "./../interfaces";

export const Response = (retur: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.status((retur.meta.status) ? retur.meta.status : 500).json(<IResponse> retur);
}