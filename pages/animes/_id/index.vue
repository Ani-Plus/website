<!--
-------------------------------------------------
- Params'a ID'si girilen animenin tüm bilgisini burada görüntüler.
- Sezon bilgisine '/season/:season' ve bölüm bilgisine '/season/:season/episode/:episode' yölendirir.
-------------------------------------------------
-->
<template>
<main>
<div class="location">
     <NuxtLink to="/">Ana Sayfa</NuxtLink> > <NuxtLink to="/animes">Animeler</NuxtLink> > <NuxtLink :to="`/animes/${id}`">{{ defname }}</NuxtLink>
</div>
<div class="line"></div><br>
<div class="card">
<img class="cover" :src="cover">
<span class="text">
    <h2>{{ defname }}</h2>
    {{ info.data.dates.from }} - {{ info.data.dates.to }}<br>
    <i style="font-size: 15px;color:yellow;" class="fa-solid fa-star"></i> {{ info.data.mal.score }} / 10 <a class="link" :href="info.data.mal.url">(MyAnimeList)</a><br> <i style="font-size: 15px;color:royalblue;" class="fa-solid fa-bookmark"></i>  <NuxtLink to="#sezonlar">{{ info.data.seasonCount }} Sezon</NuxtLink> - {{ info.data.episodeCount }} Bölüm <br> <i style="font-size: 15px;color:palevioletred;" class="fa-solid fa-eye"></i> {{ info.data.type.replaceAll("TV", "Dizi") }}<br>
    <span v-for="item of info.data.genres" class="genres">{{ item }}</span><br>
    <i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">{{ info.data.isCompleted ? "TAMAMLANDI" : "YAYINLANIYOR" }}</span><br>
    <i style="font-size:13px;color:palevioletred;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">Bölüm Başına Ortalama {{ info.data.minsPerEP }} dakika</span>
</span>
<p>{{ info.data.descriptions.tr }}</p>
</div>
<div class="line"></div>
<div v-for="item in Object.keys(database.seasons)" class="card">
<h2 id="sezonlar">Sezonlar ({{ info.data.seasonCount }})</h2>
<NuxtLink :to="`/animes/${id}/season/${parseInt(Object.keys(database.seasons).indexOf(item)) + 1}`"><img :src="database.seasons[`${item}`].seasonCover" class="seasoncover"></NuxtLink>
<br>
<span class="seasoname">{{ database.seasons[`${item}`].seasonName }}</span>
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
let ids = {
    "38101": "go-toubun-no-hanayome",
    "32998": "91days",
    "22199": "akamegakill",
    "11111": "another",
    "35507": "classroom-of-the-elite"
}
export default {
    head() {
        return{
            title: `${this.defname} - Ani+`,
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
            cover: `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=cover`,
            banner: `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=banner`,
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
            if (process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            let ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            if(!fs.existsSync(path.join(`${process.cwd()}`, `/database/${this.$route.params.id}.yaml`))) {
            database = null
            }else{
            database = YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/${this.$route.params.id}.yaml`), "utf-8"))
            }
            }
            this.database = database
            let sc = database.uploadedSeasonCount
            this.seasoncount = sc
            this.info = await fetch(`${infoURL}?name=${ids[String(this.$route.params.id)]}`).then(response => response.json())
            this.defname = this.info.data.names.default
        }catch(err) {
            console.log(err)
        }
    }
}
</script>