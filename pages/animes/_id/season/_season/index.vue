<!--
-------------------------------------------------
- Numarası girilen sezonun tüm bilgisi görüntülenir.
- Bölüme yönlendirir '/episode/:episode'
-------------------------------------------------
-->
<template>
<main>
    <div class="location">
     <NuxtLink to="/">Ana Sayfa</NuxtLink> > <NuxtLink to="/animes">Animeler</NuxtLink> > <NuxtLink :to="`/animes/${id}`">{{ defname }}</NuxtLink> > <NuxtLink :to="`/animes/season/${season}`">{{ season }}.Sezon</NuxtLink>
</div>
<div class="line"></div><br>
 <div class="card">
    <img class="cover" :src="database.seasons[`season${season}`].seasonCover">
    <span class="text">
        <h2>{{ database.seasons[`season${season}`].seasonName }}</h2>
        <i style="font-size: 15px;color:yellow;" class="fa-solid fa-star"></i> {{ info.data.mal.score }}/ 10 <a class="link" href="https://myanimelist.net">(MyAnimeList)</a><br> <i style="font-size: 15px;color:royalblue;" class="fa-solid fa-bookmark"></i>  <a href="#bolumler">{{ database.seasons[`season${season}`].episodeCount }} Bölüm</a><br> <i style="font-size: 15px;color:palevioletred;" class="fa-solid fa-eye"></i> Anime Sezonu<br>
        <span v-for="item of info.data.genres" class="genres">{{ item }}</span><br>
            <i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">{{ info.data.isCompleted ? "TAMAMLANDI" : "YAYINLANIYOR" }}</span><br>
    <i style="font-size:13px;color:palevioletred;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">Bölüm Başına Ortalama {{ info.data.minsPerEP }} dakika</span>
    </span>
    <p>
        {{ database.seasons[`season${season}`].description }}
    </p>
 </div>
 <div class="line"></div>
 <div class="card">
    <h2 id="bolumler">Bölümler ({{ database.uploadedEpisodeCount }})</h2>
    <span v-for="item in Object.keys(database.seasons[`season${season}`]['episodes'])">
    <NuxtLink :to="`/animes/${id}/watch/season/${season}/episode/${Number(Object.keys(database.seasons['season' + season]['episodes']).indexOf(item)) + 1}`"><img class="episodecover" :src="database.seasons[`season${season}`]['episodes'][item].episodePreview"></NuxtLink>
    <span class="text">
        <h4>Bölüm {{ Number(Object.keys(database.seasons['season' + season]['episodes']).indexOf(item)) + 1 }}: {{ database.seasons[`season${season}`]['episodes'][item].episodeName }}</h4>
        {{ database.seasons[`season${season}`]['episodes'][item].description }}</span><br>
    </span>
 </div>
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
            season: this.$route.params.season,
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