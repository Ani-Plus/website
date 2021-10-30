import express from "express";
const app = express()

import config from "../application";
import render from "../scripts/renderPage";
import logger from "../utils/scripts/logger";

logger("Ani+ is Ready!")

app.get("/", (req, res) => {
    return res.send("hello world")
    // return render("main", res)
})

app.listen(config.port)