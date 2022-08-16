<template>
    <main>
        <div class="location">
            <a href="/">Ana Sayfa</a> > <a href="/lists">Listeler</a>
        </div>
        <div class="line"></div><br>
        <div class="card">
            <h2>Listeler</h2>
        </div>
        <div style="flex-direction: row; flex-wrap: wrap;flex-basis: 0px;" class="card">
           <a v-for="like of lists.likes" v-bind:key="like" :href="`/lists/${lists.ids[lists.likes.indexOf(like)]}`" target="_blank"><img :src="lists.covers[lists.likes.indexOf(like)]" style="padding: 5px;border: 3px solid #080808;" width="250px" height="350px"></a><br>
           <a style="text-decoration: none;padding-left: 5px;padding-right: 50px;" v-for="like of lists.likes" v-bind:key="like" :href="`/lists/${lists.ids[lists.likes.indexOf(like)]}`" target="_blank"> {{ lists.names[lists.likes.indexOf(like)] }} </a>
        </div><br>
        <div class="line"></div><br>
    </main>
</template>

<script>
export default {
    head() {
        return{
            title: `Listeler - Ani+`,
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
        return {
            lists: {
                ids: [],
                covers: [],
                likes: [],
                names: []
            }
        }
    },
    async fetch() {
        let ids;
        if(process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');

            const lists = YAML.parse(fs.readFileSync(path.join(process.cwd(), "/database/lists.yaml"), "utf-8"))
            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            let likes = [];
            let coverarts = [];
            let idss = [];
            let n = [];
            for(let item of lists["lists"]) {
                let cvr = ids[YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))["animes"][0]]
                likes.push(YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))["likes"])
                coverarts.push(`https://cdn3.falsisdev.repl.co/anime/images?name=${cvr}&type=cover`)
                idss.push(YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))["listID"])
                n.push(YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))["name"])
            }
            this.lists.names = n
            this.lists.likes = likes
            this.lists.ids = idss
            this.lists.covers = coverarts
        }
    }
}
</script>