import express from "express";
const app = express()

import config from "../application";
import render from "../scripts/renderPage";
import logger from "../utils/scripts/logger";
const animedata = require("../database/client/andata.json");

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
app.get("/error", (req, res) => {
  res.render("error")
})
app.get("/anime/:name", (req, res) => {
  if(!animedata[req.params.name]) res.json({
    response: "Böyle bir sayfa bulunamadı."
  })
    let anime = {
      name: animedata[req.params.name]["names"]["en"],
      types: animedata[req.params.name]["manga"]["genres"].join("/"),
      description: animedata[req.params.name]["descriptions"]["tr"],
      cover: animedata[req.params.name]["manga"]["covers"]["last"],
      background: animedata[req.params.name]["design"].banner || "https://animecix.net/client/assets/images/default_episode_poster.jpg",
      year: animedata[req.params.name]["anime"]["date"].split(" ")[2],
      seasons: animedata[req.params.name]["anime"]["seasons"],
      seasonCount: animedata[req.params.name].anime.seasoncount
    }
    res.render(process.cwd() + "/views/anime", {anime})
})
app.get("/anime/watch/:name/:season/:episode", (req, res) => {
  if(!animedata[req.params.name]) res.redirect("/error")
  let name:string = req.params.name.split("-").join(" ").replace(req.params.name.split("-").join(" ")[0], req.params.name.split("-").join(" ")[0].toUpperCase())
  let anime = {
    name: name,
    types: animedata[req.params.name]["manga"]["genres"].join("/"),
    description: animedata[req.params.name]["descriptions"]["tr"],
    cover: animedata[req.params.name]["manga"]["covers"]["last"],
    background: "https://st2.depositphotos.com/3765753/5349/v/600/depositphotos_53491489-stock-illustration-example-rubber-stamp-vector-over.jpg",
    year: animedata[req.params.name]["year"],
    seasons: animedata[req.params.name]["anime"]["date"].split(" ")[2],
    seasonCount: animedata[req.params.name].anime.seasoncount
  }
    let season = req.params.season
    let episode = req.params.episode
    let dat = animedata[req.params.name]
    res.render(process.cwd() + "/views/watch", {anime, season, episode, dat})
})
//////////////////////////////////
app.listen(config.port)
