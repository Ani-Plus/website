import express from "express";
const app = express()

import config from "../application";
import render from "../scripts/renderPage";
import logger from "../utils/scripts/logger";
const animedata = require("../database/client/andata.json");
const listdata = require("../database/client/lists.json");
const accountdata = require("../database/user/accounts.json");
const commentdata = require("../database/client/comments.json");

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
      date: animedata[req.params.name]["anime"]["date"].split("Jan").join("Ocak").split("Feb").join("Şubat").split("March").join("Mart").split("Apr").join("Nisan").split("May").join("Mayıs").split("Jun").join("Haziran").split("Jul").join("Temmuz").split("Aug").join("Ağustos").split("Sep").join("Eylül").split("Oct").join("Ekim").split("Nov").join("Kasım").split("Dec").join("Aralık").split(",").join("").split("Now").join("Hala Yayınlanıyor."),
      description: animedata[req.params.name]["descriptions"]["tr"],
      cover: animedata[req.params.name]["manga"]["covers"]["last"],
      background: animedata[req.params.name]["design"].banner || "https://animecix.net/client/assets/images/default_episode_poster.jpg",
      year: animedata[req.params.name]["anime"]["date"].split(" ")[2],
      seasons: animedata[req.params.name]["anime"]["seasons"],
      seasonCount: animedata[req.params.name].anime.seasoncount
    }
    let comments;
    try {
    comments = {
      principle: commentdata.principle, 
      count: commentdata[`/anime/${req.params.name}`].commentscount, 
      comments: commentdata[`/anime/${req.params.name}`].comments 
    }
  }catch(err) {
    comments = {
      principle: commentdata.principle, 
      count: 0, 
      comments: "{}"
    }
  }
    let n = req.params.name
    let data = animedata[req.params.name]
    res.render(process.cwd() + "/views/anime", {anime, n, data, comments})
})
app.get("/anime/watch/:name/:season/:episode", (req, res) => {
  if(!animedata[req.params.name]) res.json({
    response: "Böyle bir sayfa bulunamadı."
  })
  let anime = {
    name: animedata[req.params.name]["names"]["en"],
    types: animedata[req.params.name]["manga"]["genres"].join("/"),
    date: animedata[req.params.name]["anime"]["date"].split("Jan").join("Ocak").split("Feb").join("Şubat").split("March").join("Mart").split("Apr").join("Nisan").split("May").join("Mayıs").split("Jun").join("Haziran").split("Jul").join("Temmuz").split("Aug").join("Ağustos").split("Sep").join("Eylül").split("Oct").join("Ekim").split("Nov").join("Kasım").split("Dec").join("Aralık").split(",").join("").split("Now").join("Hala Yayınlanıyor."),
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
app.get("/anime/:name/season/:season", (req, res) => {
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
app.get("/lists/:id", (req, res) => {
  if(!listdata[req.params.id]) res.json({
    response: "Böyle bir sayfa bulunamadı."
  })
  let list = {
    name: listdata[req.params.id].name,
    description: listdata[req.params.id].description,
    author: {
      name: listdata[req.params.id].author.name,
      avatar: listdata[req.params.id].author.avatar,
      id: listdata[req.params.id].author.id,
      isMod: listdata[req.params.id].author.isMod //boolean
    },
    content: listdata[req.params.id].content
  }
  let anime = animedata
  res.render(process.cwd() + "/views/list", {list, anime})
})
//////////////////////////////////
app.listen(config.port)
