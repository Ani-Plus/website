<!--
-------------------------------------------------
- Numarası girilen sezon izlenir.
- Yönlendirme içermez.
-------------------------------------------------
-->
<template>
<main>
<div class="location">
     <NuxtLink to="/">Ana Sayfa</NuxtLink> > <NuxtLink to="/animes">Animeler</NuxtLink> > <NuxtLink :to="`/animes/${id}`">{{ defname }}</NuxtLink> > <NuxtLink :to="`/animes/season/${season}`">{{ season }}.Sezon</NuxtLink> > <NuxtLink :to="`/animes/season/${season}/episode/${episode}`">{{ episode }}.Bölüm</NuxtLink>
</div>
<div class="line"></div><br>
<div class="card">
    <iframe id="vid" width="560" height="315" :src="epdata['urls'][epdata['fansubs'][0]]" frameborder="0" allow="autoplay" allowfullscreen></iframe>
    <span class="text">
        <h3>{{ epdata["episodeName"] }}</h3>
        {{ epdata["episodeDate"] }}<br>
        <i style="font-size: 15px;color:palevioletred;" class="fa-solid fa-eye"></i> Bölüm<br>
        <i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span id="subs" style="font-size: 15px;">{{ epdata["fansubs"][0] }}</span><br><br>
         <button id="subselect" @click="subselect">{{epdata["fansubs"][1] }}</button><br><br>
         <button @click="prev" class="button" title="Önceki Bölüm">Önceki Bölüm</button> <button @click="next" class="button" title="Sonraki Bölüm">Sonraki Bölüm</button>
             </span>
         <p>
            {{ epdata["description"] }}
         </p>
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
            title: `${this.defname} ${this.season}.Sezon ${this.episode}. Bölüm - Ani+`,
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
            episode: this.$route.params.episode,
            database: [],
            epdata: [],
        }
    },
    methods: {
      subselect() {
              if(document.getElementById(`subs`).innerText == this.epdata.fansubs[0]) {
                document.getElementById(`subs`).innerText = this.epdata.fansubs[1]
                document.getElementById(`subselect`).innerText = this.epdata.fansubs[0]
                document.getElementById(`vid`).src = this.epdata['urls'][this.epdata['fansubs'][1]]
              }else if(document.getElementById(`subs`).innerText == this.epdata.fansubs[1]) {
                document.getElementById(`subs`).innerText = this.epdata.fansubs[0]
                document.getElementById(`subselect`).innerText = this.epdata.fansubs[1]
                document.getElementById(`vid`).src = this.epdata['urls'][this.epdata['fansubs'][0]]
              }
            },
      next() {
            if(this.database.seasons[`season${this.$route.params.season}`].uploadedEpisodeCount == this.$route.params.episode) {
              window.location.href = `/animes/${this.$route.params.id}`
            }else{
              window.location.href = `/animes/${this.$route.params.id}/watch/season/${this.$route.params.season}/episode/${parseInt(this.$route.params.episode) + 1}`
            }
      },
      prev() {
            if(this.$route.params.episode == 1) {
              window.location.href = `/animes/${this.$route.params.id}`
            }else{
              window.location.href = `/animes/${this.$route.params.id}/watch/season/${this.$route.params.season}/episode/${this.$route.params.episode - 1}`
            }
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
            let db = database['seasons'][`season${this.$route.params.season}`]['episodes'][`episode${this.$route.params.episode}`]
            this.epdata = db
            this.info = await fetch(`${infoURL}?name=${ids[String(this.$route.params.id)]}`).then(response => response.json())
            this.defname = this.info.data.names.default
        }catch(err) {
            console.log(err)
        }
    }
}
</script>