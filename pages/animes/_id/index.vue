<!--
-------------------------------------------------
- Params'a ID'si girilen animenin tüm bilgisini burada görüntüler.
- Sezon bilgisine '/season/:season' ve bölüm bilgisine '/season/:season/episode/:episode' yölendirir.
-------------------------------------------------
-->
<template>
<main v-if="defname == null">
  <div align="center" style="justify-items: center;align-items: center;" class="card">
    <h1>OOOOPS! Maalesef, böyle bir anime aslında yok!</h1>
  </div>
</main>
<main v-else>
<div class="location">
     <a href="/">Ana Sayfa</a> > <a href="/animes">Animeler</a> > <a :href="`/animes/${id}`">{{ defname }}</a>
</div>
<div class="line"></div><br>
<div class="card">
<img class="cover" :src="cover">
<span class="text">
    <h2>{{ defname }}</h2>
    {{ info.data.dates.from }} - {{ info.data.dates.to }}<br>
    <i style="font-size: 15px;color:yellow;" class="fa-solid fa-star"></i> {{ info.data.mal.score }} / 10 <a class="link" :href="info.data.mal.url">(MyAnimeList)</a><br> <i style="font-size: 15px;color:royalblue;" class="fa-solid fa-bookmark"></i>  <a href="#sezonlar">{{ info.data.seasonCount }} Sezon</a> - {{ info.data.episodeCount }} Bölüm <br> <i style="font-size: 15px;color:palevioletred;" class="fa-solid fa-eye"></i> {{ info.data.type.replaceAll("TV", "Dizi") }}<br>
    <span v-for="item of info.data.genres" v-bind:key="item" class="genres">{{ item }}</span><br>
    <i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">{{ info.data.isCompleted ? "TAMAMLANDI" : "YAYINLANIYOR" }}</span><br>
    <i style="font-size:13px;color:palevioletred;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">Bölüm Başına Ortalama {{ info.data.minsPerEP }} dakika</span>
</span>
<p>{{ info.data.descriptions.tr }}</p>
</div>
<div class="line"></div>
<div class="card">
<h2 id="sezonlar">Sezonlar ({{ info.data.seasonCount }})</h2>
<a v-for="item in Object.keys(database.seasons)" v-bind:key="item" :href="`/animes/${id}/season/${parseInt(Object.keys(database.seasons).indexOf(item)) + 1}`"><img :src="database.seasons[`${item}`].seasonCover" class="seasoncover"></a>
<br>
<span v-for="item in Object.keys(database.seasons)" v-bind:key="item" class="seasoname">{{ database.seasons[`${item}`].seasonName }}</span>
</div>
<br><br>
<div class="line"></div>
<div class="card">
<h2>Yorumlar</h2>
Çok Yakında...
<br><br>
</div>
<div class="line"></div>
</main>
</template>
<script>
let baseURL = `https://cdn3.falsisdev.repl.co`;
let imagesURL = `${baseURL}/anime/images`
let infoURL = `${baseURL}/anime/info`
let imagesQueries = [
    "name",
    "type",
    "order"
]
export default {
    head() {
        return{
            title: `${this.defname || 'Hata!'} - Ani+`,
        link: [
          {
             rel: 'icon', type: 'image/x-icon', href: 'https://cdn.discordapp.com/attachments/775822548519616562/1002503519716261939/logo.png?size=4096'
          },
          {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
          }
          ],
        script: [
          {
            src: "https://kit.fontawesome.com/e0330794a8.js",
            crossorigin: "anonymous"
          }
        ]
        }
      },
    data() {
        return{
            cover: '',
            banner: '',
            info: [],
            defname: [],
            id: this.$route.params.id,
            database: [],
            seasoncount: []
        }
    },
    async fetch() {
        try {
            let database;
            let ids;
            if (process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            if(!ids[this.$route.params.id]) {
              database = null
            }else{
            if(!fs.existsSync(path.join(`${process.cwd()}`, `/database/${this.$route.params.id}.yaml`))) {
            database = null
            }else{
            database = YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/${this.$route.params.id}.yaml`), "utf-8"))
            }
            }
            }
            let sc;
            if(!ids[this.$route.params.id]) {
              this.cover, this.banner, sc, this.info, this.defname = null
            }else{
            this.cover = `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=cover`
            this.banner = `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=banner`
            this.database = database
            sc = database.uploadedSeasonCount
            this.seasoncount = sc
            this.info = await fetch(`${infoURL}?name=${ids[String(this.$route.params.id)]}`).then(response => response.json())
            this.defname = this.info.data.names.default
            }
        }catch(err) {
            console.log(err)
        }
    }
}
</script>