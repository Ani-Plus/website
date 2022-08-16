<template>
<main>
    <div class="location">
     <a href="/">Ana Sayfa</a> > <a href="/lists">Listeler</a> > <a :href="`/lists/${listid}`">{{ name }}</a>
</div>
    <div class="card">
        <h2>
            {{ name }}
            <br>
            <span style="font-size: 12.5px;">
                {{ desc }}
            </span>
            <span style="font-size: 10px;">
            <br>
            <img :src="av" class="avatar"><a style="text-decoration: none;" :href="`/profiles/${ownerid}`"><b>{{ uname }}</b></a>  ( <i v-if="isMod == true" style="color: #BDAAF9;font-size: 15px;" class="fa-solid fa-hammer"></i> )  tarafından - <span v-if="isSecret == true"><i class="fa-solid fa-lock" style="padding-right: 2px;"></i> Gizli </span> <span v-else> <i class="fa-solid fa-lock-open" style="padding-right: 2px;"></i> Herkese Açık </span> - {{ count }} İçerik - <i class="fa-solid fa-heart" style="padding-right: 2px;"></i>  {{ likes }} Beğenme <span v-if="isVerified == true"> -  <i class="fa-solid fa-check" style="padding-right: 2px;"></i> Doğrulanmış Liste</span> <span v-else></span>
            </span>
        </h2>
        <div class="line"></div>
        <br><br>
        <div style="flex-direction: row; flex-wrap: wrap">
            <a v-for="item of covers" v-bind:key="item" :href="`/animes/${animes[covers.indexOf(item)]}`"><img v-bind:key="item" :src="item" style="padding: 5px;border: 3px solid #080808;" width="250px" height="350px"></a>
        </div>
        <br>
        <div class="line"></div>
        <span style="font-size: 12.5px;">
            <b>Oluşturma Tarihi:</b> {{ cd }} Saat {{ ct }} --/--
            <b>Son düzenleme Tarihi:</b> {{ ld }} Saat {{ lt }}
        </span>
        <br><br>
    </div>
</main>
</template>
<script>
export default {
    head() {
        return{
            title: `${this.name} - Ani+`,
            link: [{
            rel: 'icon', type: 'image/x-icon', href: 'https://cdn.discordapp.com/attachments/775822548519616562/1002503519716261939/logo.png?size=4096'
            },{
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
            }],
            script: [{
            src: "https://kit.fontawesome.com/e0330794a8.js",
            crossorigin: "anonymous"
            }]
        }
    },
    data() {
        return{
            name: '',
            listid: this.$route.params.id,
            ownerid: '',
            cd: '',
            ct: '',
            ld: '',
            lt: '',
            isSecret: '',
            desc: '',
            count: '',
            animes: [],
            likes: '',
            isVerified: '',
            covers: [],
            av: '',
            uname: '',
            isMod: ''
        }
    },
    async fetch() {
        if(process.server) {

            const listID = this.$route.params.id
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            const listData = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${listID}.yaml`), "utf-8"))
            const ownerData = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${listData.ownerID}.yaml`), "utf-8"))

            let listName = listData["name"]
            let ownerID = listData["ownerID"]
            let creationDate = listData["creationDate"]
            let creationTime = listData["creationTime"]
            let lastUpdateDate = listData["lastUpdateDate"]
            let lastUpdateTime = listData["lastUpdateTime"]
            let isSecret = listData["isSecret"] //boolean
            let description = listData["description"]
            let animeCount = listData["animeCount"]
            let animes = listData["animes"] //array
            let likes = listData["likes"]
            let isVerified = listData["isVerified"]
            let ownerAvatar = ownerData["useravatar"]
            let ownername = ownerData["username"]
            let isMod = ownerData["isMod"]

            this.name = listName
            this.ownerid = ownerID
            this.cd = creationDate
            this.ct = creationTime
            this.ld = lastUpdateDate
            this.lt = lastUpdateTime
            this.isSecret = isSecret
            this.desc = description
            this.count = animeCount
            this.animes = animes
            this.likes = likes
            this.isVerified = isVerified
            this.av = ownerAvatar
            this.uname = ownername
            this.isMod = isMod

            let covers = [];
            for(let item of animes) {
                const id = JSON.parse(fs.readFileSync(path.join(process.cwd(), `/database/ids.json`), "utf-8"))

                covers.push(`https://cdn3.falsisdev.repl.co/anime/images?name=${id[item]}`)
            }
            this.covers = covers
        }
    }
}
</script>