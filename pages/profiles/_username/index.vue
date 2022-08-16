<!--
-------------------------------------------------
- Doğrudan kullanıcı idsi girilen kullanıcının profilini gösterir.
- '/list' klasörğne yönlendirme içerir.
-------------------------------------------------
-->
<template>
    <main v-if="error == true">
        <div align="center" style="justify-items: center;align-items: center;" class="card">
            <h1>OOOOPS! Maalesef, böyle bir profil aslında yok!</h1>
        </div>
    </main>
    <main v-else>
        <div class="location">
            <a href="/">Ana Sayfa</a> > Kullanıcılar > <a :href="`/profiles/${userid}`">{{ username }}</a>
        </div>
        <div class="line"></div>
        <div class="card">
            <br><br>
                <img :src="useravatar" class="profileavatar">
                <span class="text">
                    <h2>{{ username }} ( <i v-if="isMod == true" style="color: #BDAAF9;font-size: 20px;" class="fa-solid fa-hammer"></i> )</h2>
                    Kullanıcı Kimliği: {{ userid }}<br>
                    Üyelik Durumu: {{ isMod ? 'Yetkili' : 'Üye' }}
                </span>
        </div>
        <br>
        <div class="card">
            <h2> Kullanıcının Listeleri </h2>
        </div>
        <div v-if="lists == null" align="center">
            Kullanıcının Herhangi bir listesi bulunmamaktadır.
            <br><br>
        </div>
        <div style="flex-direction: row; flex-wrap: wrap;flex-basis: 0px;" class="card">
            <a v-for="id of lists" v-bind:key="id" :href="`/lists/${id}`">
                <img :src="covers[lists.indexOf(id)]" style="padding: 5px;border: 3px solid #080808;" width="187.5px" height="262.5px">
            </a>
        </div>
        <div class="line"></div>
    </main>
</template>

<script>
export default {
    head() {
        return{
            title: `${this.username} - Ani+`,
            link: [{
                rel: 'icon', 
                type: 'image/x-icon', 
                href: this.useravatar
                },{
                rel: 'stylesheet', 
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
            }],
            script: [{
                src: "https://kit.fontawesome.com/e0330794a8.js",
                crossorigin: "anonymous"
            }]
        }
    },
    data() {
        return {
            username: '',
            userid: this.$route.params.username,
            useravatar: '',
            isMod: '',
            lists: [],
            covers: [],
            error: '',
        }
    },
    async fetch() {
        let ids;
        if(process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            const userid = this.$route.params.username
            if(fs.existsSync(path.join(process.cwd(), `/database/profiles/${userid}.yaml`)) == false) {
                this.error = true
            }else {
            const userinfo = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${userid}.yaml`), "utf-8"))

            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            if(!userinfo.lists){
                this.lists = null
            }else{
                let listinfo;
                let listcovers = [];
                for(let item of userinfo.lists) {
                listinfo = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))
                listcovers.push(`https://cdn3.falsisdev.repl.co/anime/images?name=${ids[listinfo["animes"][0]]}&type=cover`)
                }
                this.lists = userinfo.lists //array
                this.covers = listcovers
            }
            this.username = userinfo.username //string
            this.userid = userid //string
            this.useravatar = userinfo.useravatar //string
            this.isMod = userinfo.isMod //boolean
            this.error = false
            }
        }
    }
}
</script>