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
    let n = req.params.name
    res.render(process.cwd() + "/views/anime", {anime, n})
})
app.get("/anime/watch/:name/:season/:episode", (req, res) => {
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
    let season = req.params.season
    let episode = Number(req.params.episode)
    let dat = animedata[req.params.name].anime.seasons
    let n = req.params.name
    let ep1 = episode + 1
    let ep2 = episode - 1
    res.render(process.cwd() + "/views/watch", {anime, season, episode, dat, n, ep1, ep2})
})
app.get("/anime/:name/season/:season/", (req, res) => {
  if(!animedata[req.params.name]) res.json({
    response: "Böyle bir sayfa bulunamadı."
  })
  let anime = {
    name: animedata[req.params.name]["names"]["en"],
    types: animedata[req.params.name]["manga"]["genres"].join("/"),
    description: animedata[req.params.name]["descriptions"]["tr"],
    cover: animedata[req.params.name]["manga"]["covers"]["last"],
    background: animedata[req.params.name]["design"].banner || "https://animecix.net/client/assets/images/default_episode_poster.jpg",
    year: animedata[req.params.name]["anime"]["seasons"][req.params.season]["date"].split(" ")[2],
    seasons: animedata[req.params.name]["anime"]["seasons"],
    seasonCount: animedata[req.params.name].anime.seasoncount
  }
    let season = req.params.season
    let dat = animedata[req.params.name].anime.seasons
    let n = req.params.name
    res.render(process.cwd() + "/views/season", {anime, season, dat, n})
})
//////////////////////////////////
app.listen(config.port)
