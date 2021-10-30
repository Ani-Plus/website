import application from "../application";
import * as express from 'express';

export default function render(page: string, Response: express.Response) {
    if(application.maintance) return Response.render("maintance")
    else return Response.render(page)
}