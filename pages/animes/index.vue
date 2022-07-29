<!--
-------------------------------------------------
- Ani-Plus Web Sitesindeki Bütün Animeleri MyAnimeList Puanlarına Göre Sıralar.
- Anime Sayfasına Yönlendirme içerir '/:id'
-------------------------------------------------
-->
<template>
<main>
    <div class="location">
     <NuxtLink to="/">Ana Sayfa</NuxtLink> > <NuxtLink to="/animes">Animeler</NuxtLink>
</div>
<div class="line"></div><br>
 <div class="card">
    <h2 id="bolumler">Animeler</h2>
    <span v-for="item of scoresort">
    <NuxtLink :to="`/animes/${Object.keys(ids)[Object.values(ids).indexOf(Object.values(ids).find(arr => arr.includes(item[0])))]
}`"><img class="cover" :src="`https://cdn3.falsisdev.repl.co/anime/images=?name=${item[0]}&type=cover`"></NuxtLink><br>
</span>
 </div>
</main>
</template>
<script>
let baseURL = `https://cdn3.falsisdev.repl.co`;
let infoURL = `${baseURL}/anime/info`
let ids = {
    "38101": "go-toubun-no-hanayome",
    "32998": "91days",
    "22199": "akamegakill",
    "11111": "another"
}
export default {
    head() {
        return{
            title: `Animeler - Ani+`,
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
            info: [],
            scoresort: [],
            ids: [],
        }
    },
    async fetch() {
        try {
            let aa;
            if (process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            aa = YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/animes.yaml`), "utf-8")).animes
            this.allanimes = aa
            }
            let ii;
            let scores = {};
            for(var item in aa) {
            ii = await fetch(`${infoURL}?name=${ids[String(aa[item])]}`).then(response => response.json())
            scores[ids[String(aa[item])]] = ii.data.mal.score
            }
            var items = Object.keys(scores).map(function(key) {
            return [key, scores[key]];
            });
            items.sort(function(first, second) {
            return second[1] - first[1];
            });
            this.scoresort = items.slice(0, 5)
            this.info = ii
            this.ids = ids
        }catch(err) {
            console.log(err)
        }
    }
}
</script>