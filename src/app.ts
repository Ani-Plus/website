import express from "express";
const app = express()

import config from "../application";
import render from "../scripts/renderPage";
import logger from "../utils/scripts/logger";
const animedata = require("../database/client/animedata.json");

logger("Ani+ is Ready!")
//////////////////////////////////
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views")
//////////////////////////////////
app.get("/", function(req, res) {
    let test: string = "Test Text"
    res.render("index", {test})
})
app.get("/style", function(req, res) {
    res.sendFile(process.cwd() + "/utils/styles/style.css")
})
app.get("/logo", function(req, res) {
    res.sendFile(process.cwd() + "/utils/images/logo.png")
})
app.get("/anime/:name", (req, res) => {
  if(!animedata[req.params.name]) res.send("Böyle bir anime yüklenmemiş.")
  let name:string = req.params.name.split("-").join(" ").replace(req.params.name.split("-").join(" ")[0], req.params.name.split("-").join(" ")[0].toUpperCase())
    let anime = {
      name: name,
      types: animedata[req.params.name].types.join("/"),
      description: animedata[req.params.name].description,
      cover: animedata[req.params.name].cover,
      background: animedata[req.params.name].background,
      year: animedata[req.params.name].year,
      seasons: animedata[req.params.name]
    }
    res.render(process.cwd() + "/views/anime", {anime})
})
//////////////////////////////////
app.listen(config.port)
