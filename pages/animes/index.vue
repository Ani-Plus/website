<!--
-------------------------------------------------
- Ani-Plus Web Sitesindeki Bütün Animeleri MyAnimeList Puanlarına Göre Sıralar.
- Anime Sayfasına Yönlendirme içerir '/:id'
-------------------------------------------------
-->
<template>
<main>
<div class="location">
  <a href="/">Ana Sayfa</a> > <a href="/animes">Animeler</a>
</div>
<div class="line"></div><br>
<div class="card">
<h2>Animeler</h2>
</div>
 <div v-for="item of scoresort" v-bind:key="item" class="card">
    <a :href="`/animes/${Object.keys(ids)[Object.values(ids).indexOf(Object.values(ids).find(arr => arr.includes(item[0])))]
}`"><img class="cover" :src="`https://cdn3.falsisdev.repl.co/anime/images?name=${item[0]}&type=cover`"></a>
<span class="text">
  <h2>{{ info[item[0]].names.default }}</h2>
  {{ info[item[0]].dates.from }} - {{ info[item[0]].dates.to }}<br>
  <i style="font-size: 15px;color:yellow;" class="fa-solid fa-star"></i> {{ info[item[0]].mal.score }} / 10 <a class="link" :href="info[item[0]].mal.url">(MyAnimeList)</a><br>
  <i style="font-size: 15px;color:royalblue;" class="fa-solid fa-bookmark"></i> <a :href="`/animes/${Object.keys(ids)[Object.values(ids).indexOf(Object.values(ids).find(arr => arr.includes(item[0])))]
}#sezonlar`">{{ info[item[0]].seasonCount }} Sezon</a> - {{ info[item[0]].episodeCount }} Bölüm <br>
<i style="font-size: 15px;color:palevioletred;" class="fa-solid fa-eye"></i> {{ info[item[0]].type.replaceAll("TV", "Dizi") }}<br>
<span v-for="item of info[item[0]].genres" v-bind:key="item" class="genres">{{ item }}</span><br>
<i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">{{ info[item[0]].isCompleted ? "TAMAMLANDI" : "YAYINLANIYOR" }}</span><br>
    <i style="font-size:13px;color:palevioletred;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">Bölüm Başına Ortalama {{ info[item[0]].minsPerEP }} dakika</span>
</span>
<br>
 </div>
</main>
</template>
<script>
let baseURL = `https://cdn3.falsisdev.repl.co`;
let infoURL = `${baseURL}/anime/info`
let ids;
if(process.server) {
const fs = require('fs');
const path = require('path');
ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
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
            ids: []
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
            ii = new Array();
            let scores = {};
            let inf = {};
            for(var item in aa) {
            ii.push(await fetch(`${infoURL}?name=${ids[String(aa[item])]}`).then(response => response.json()))
            inf[ids[String(aa[item])]] = ii[item].data
            scores[ids[String(aa[item])]] = ii[item].data.mal.score
            }
            var items = Object.keys(scores).map(function(key) {
            return [key, scores[key]];
            });
            items.sort(function(first, second) {
            return second[1] - first[1];
            });
            this.scoresort = items.slice(0, 5)
            this.info = inf
            this.ids = ids
        }catch(err) {
            console.log(err)
        }
    }
}
</script>