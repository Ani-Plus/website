import express from "express";
const app = express()

import config from "../application";
import render from "../scripts/renderPage";
import logger from "../utils/scripts/logger";
const animedata = require("../database/client/andata.json");
const listdata = require("../database/client/lists.json");
const accountdata = require("../database/user/accounts.json");
import fs from 'fs';
import axios from 'axios';
//commentdata

logger("Ani+ is Ready!")
//////////////////////////////////
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views")
//////////////////////////////////
app.get("/", function(req, res) {
    let data = animedata
    res.render("index", {data})
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
app.get("/anime/:name", async(req, res) => {
  try {
  const response:any = await axios.get(`https://media.falsisdev.repl.co/?anime=${req.params.name}`, {
    method: "GET",
    headers: {
      Accept: 'application/json',
    }
  })
  const anidata:any = response["data"]
  delete require.cache[require.resolve("../database/client/comments.json")]
  let commentdata:any = require(process.cwd() + "/database/client/comments.json")
  if(anidata.message == "refresh the page" && "not found") res.redirect("/")
  let genres = new Array();
  for(let item of anidata["genres"]) {
    let a = item["name"].replaceAll("Comedy", "Komedi").replaceAll("Action", "Aksiyon").replaceAll("Adventure", "Macera").replaceAll("Fantasy", "Fantezi").replaceAll("Sci-Fi", "Bilim Kurgu").replaceAll("Romance", "Romantik").replaceAll("Drama", "Dram").replaceAll("Suspense", "Gerilim").replaceAll("Ecchi", "Ecchi(+18)").replaceAll("Supernatural", "Doğa Üstü")
    genres.push(a)
  }
  var a:any = await axios.get(`https://api.falsisdev.repl.co/translate?key=Zu3LXm6aPzi0Tj9sk&text=${encodeURI(anidata["synopsis"])}&from=en&lang=tr`, {
    method: "GET",
    headers: {
      Accept: 'application/json',
    }
  })
  var desc:string = a["data"]["translated"].replaceAll("Mal Rewrite", "My Anime List Rewrite")
    let anime = {
      name: anidata["title"],
      types: genres,
      type: anidata["type"].replaceAll("Movie", "Film").replaceAll("TV", "Dizi"),
      episodes: anidata["episodes"],
      duration: anidata["duration"].replaceAll("min per ep", "dakika").replaceAll("min", "dakika").replaceAll("hr", "saat"),
      score: anidata["score"],
      mal: anidata["url"],
      date: `${anidata["aired"]["prop"]["from"]["day"]}/${anidata["aired"]["prop"]["from"]["month"]}/${anidata["aired"]["prop"]["from"]["year"]}`,//
      description: desc,
      cover: anidata["images"]["jpg"]["large_image_url"],
      background: "https://animecix.net/client/assets/images/default_episode_poster.jpg",
      year: anidata["year"],
      isCompleted: anidata["airing"] ? false : true,
      seasonCount: 1,
      seasons: {"1": {"cover": anidata["images"]["jpg"]["large_image_url"]}},//animedata[req.params.name]["anime"]["seasons"],//
    }
    let comments;
    try {
    comments = {
      principle: commentdata.principle, 
      count: commentdata[`/anime/${req.params.name}`].commentscount, 
      count1: commentdata[`/anime/${req.params.name}`].commentscount1,
      comments: commentdata[`/anime/${req.params.name}`].comments 
    }
  }catch(error) {
    comments = {
      principle: commentdata.principle, 
      count: 0, 
      count1: 1,
      comments: "{}"
    }
  }
    let n = req.params.name
    let data = animedata[req.params.name]
    res.render("anime", {anime, n, data, comments})
  }catch(err) {
    res.redirect("/")
  }
})
app.get("/anime/watch/:name/:season/:episode", async(req, res) => {
  try {
    const response:any = await axios.get(`https://media.falsisdev.repl.co/?anime=${req.params.name}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
      }
    })
    const anidata:any = response["data"]
    if(anidata.message == "refresh the page" && "not found") res.redirect("/")
    let genres = new Array();
    for(let item of anidata["genres"]) {
      let a = item["name"].replaceAll("Comedy", "Komedi").replaceAll("Action", "Aksiyon").replaceAll("Adventure", "Macera").replaceAll("Fantasy", "Fantezi").replaceAll("Sci-Fi", "Bilim Kurgu").replaceAll("Romance", "Romantik").replaceAll("Drama", "Dram").replaceAll("Suspense", "Gerilim").replaceAll("Ecchi", "Ecchi(+18)").replaceAll("Supernatural", "Doğa Üstü")
      genres.push(a)
    }
    var a:any = await axios.get(`https://api.falsisdev.repl.co/translate?key=Zu3LXm6aPzi0Tj9sk&text=${encodeURI(anidata["synopsis"])}&from=en&lang=tr`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
      }
    })
    var desc:string = a["data"]["translated"].replaceAll("Mal Rewrite", "My Anime List Rewrite")
      let anime = {
        name: anidata["title"],
        types: genres,
        type: anidata["type"].replaceAll("Movie", "Film").replaceAll("TV", "Dizi"),
        episodes: anidata["episodes"],
        duration: anidata["duration"].replaceAll("min per ep", "dakika").replaceAll("min", "dakika").replaceAll("hr", "saat"),
        score: anidata["score"],
        mal: anidata["url"],
        date: `${anidata["aired"]["prop"]["from"]["day"]}/${anidata["aired"]["prop"]["from"]["month"]}/${anidata["aired"]["prop"]["from"]["year"]}`,//
        description: desc,
        cover: anidata["images"]["jpg"]["large_image_url"],
        background: "https://animecix.net/client/assets/images/default_episode_poster.jpg",
        year: anidata["year"],
        isCompleted: anidata["airing"] ? false : true,
        seasonCount: 1,
        seasons: {"1": {"cover": anidata["images"]["jpg"]["large_image_url"]}},//animedata[req.params.name]["anime"]["seasons"],//
      }
    let season = req.params.season
    let episode = Number(req.params.episode)
    //let dat = animedata[req.params.name].anime.seasons
    let n = req.params.name
    let ep1 = episode + 1
    let ep2 = episode - 1
    res.render("watch", {anime, season, episode, /*dat,*/ n, ep1, ep2})
  }catch(err) {
    res.json({
      response: "Böyle bir sayfa bulunamadı."
    })
    console.log(err)
  }
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