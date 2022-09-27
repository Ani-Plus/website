<template>
<main :data-theme="theme" class="select-none">
  <div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">Ani+</a>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input type="text" placeholder="Ara..." class="input input-bordered" />
    </div>
    <div v-if="loginbutton == false" class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img :src="useravatar" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between" @click="profil()">
            Profil
            <span class="badge">Yeni!</span>
          </a>
        </li>
        <li><a href="/lists">Listeler</a></li>
        <li><a @click="logout()">Çıkış Yap</a></li>
      </ul>
    </div>
    <button v-else @click="redirect('login')" class="btn btn-primary">Giriş Yap</button>
  </div>
</div>
<div class="text-sm breadcrumbs" style="padding-left: 100px;">
     <ul>
        <li><a href="/">Ana Sayfa</a></li>
        <li><a href="/lists">Listeler</a></li>
        <li><a :href="`/lists/${listid}`">{{ name }}</a> </li>
     </ul>
</div>
<div class="divider"></div>
<br>
<div align="center">
<h1 style="font-size: 25px;">{{ name }}</h1>
<span style="font-size: 12.5px;">
    {{ desc }}
</span>
<span style="font-size: 10px;">
            <br>
            <span class="avatar"><div class="w-4 rounded-full"><img :src="av"/></div></span>
            <a style="text-decoration: none;" :href="`/profiles/${ownerid}`"><b>{{ uname }}</b></a>  <b class="tooltip" data-tip="Moderatör">( <i v-if="isMod == true" style="color: #BDAAF9;font-size: 15px;" class="fa-solid fa-hammer"></i> )</b>  tarafından oluşturuldu. - <span v-if="isSecret == true"><i class="fa-solid fa-lock" style="padding-right: 2px;"></i> Gizli </span> <span v-else> <i class="fa-solid fa-lock-open" style="padding-right: 2px;"></i> Herkese Açık </span> - {{ count }} İçerik - <i class="fa-solid fa-heart" style="padding-right: 2px;"></i>  {{ likes }} Beğenme <span v-if="isVerified == true"> -  <i class="fa-solid fa-check" style="padding-right: 2px;"></i> Doğrulanmış Liste</span> <span v-else></span>
</span>
</div>
<div class="divider"></div>
<div class="flex flex-row flex-wrap">
            <a v-for="item of covers" v-bind:key="item" :href="`/animes/${animes[covers.indexOf(item)]}`" class="tooltip" :data-tip="idss[animes[covers.indexOf(item)]]"><img v-bind:key="item" :src="item" style="padding: 10px;" width="250px" height="350px"></a>
        <br>
    </div>
    <div class="divider"></div>
    <div style="font-size: 12.5px;" align="center">
            <b>Oluşturma Tarihi:</b> {{ cd }} Saat {{ ct }} --/--
            <b>Son düzenleme Tarihi:</b> {{ ld }} Saat {{ lt }}
    </div><br>

<footer class="footer p-10 bg-neutral text-neutral-content">
  <div>
    <h1 style="font-size: 25px;">Ani+</h1>
    <p>Ani+ - Türkçe Anime İzleme Sitesi<br>2021'den beri</p>
  </div> 
  <div>
    <span class="footer-title">Tema</span> 
    <div class="grid grid-flow-col gap-4">
      <select class="select select-info w-full max-w-xs">
        <option disabled selected>Tema Seç</option>
        <option @click="tema('light')">Light (Açık Tema)</option>
        <option @click="tema('dark')">Dark (Koyu Tema)</option>
        <option @click="tema('cupcake')">Cupcake (Açık Tema)</option>
        <option @click="tema('bumblebee')">Bumblebee (Açık Tema)</option>
        <option @click="tema('emerald')">Emerald (Açık Tema)</option>
        <option @click="tema('corporate')">Corporate (Açık Tema)</option>
        <option @click="tema('night')">Night (Koyu Tema) (Varsayılan)</option>
        <option @click="tema('dracula')">Dracula (Koyu Tema) (Önerilen)</option>
        <option @click="tema('cyberpunk')">Cyberpunk (Koyu Tema)</option>
        <option @click="tema('valentine')">Valentine (Açık Tema)</option>
        <option @click="tema('synthwave')">Synthwave (Koyu Tema)</option>
        <option @click="tema('retro')">Retro (Açık Tema)</option>
        <option @click="tema('halloween')">Halloween (Koyu Tema)</option>
        <option @click="tema('garden')">Garden (Açık Tema)</option>
        <option @click="tema('forest')">Forest (Koyu Tema)</option>
        <option @click="tema('aqua')">Aqua (Koyu Tema)</option>
        <option @click="tema('lofi')">Lofi (Açık Tema)</option>
        <option @click="tema('pastel')">Pastel (Açık Tema)</option>
        <option @click="tema('fantasy')">Fantasy (Açık Tema)</option>
        <option @click="tema('wireframe')">Wireframe (Açık Tema)</option>
        <option @click="tema('black')">Black (Koyu Tema)</option>
        <option @click="tema('luxury')">Luxury (Koyu Tema)</option>
        <option @click="tema('cmyk')">Cmyk (Açık Tema)</option>
        <option @click="tema('autumn')">Autumn (Açık Tema)</option>
        <option @click="tema('business')">Business (Koyu Tema)</option>
        <option @click="tema('acid')">Acid (Açık Tema)</option>
        <option @click="tema('lemonade')">Lemonade (Açık Tema)</option>
        <option @click="tema('coffee')">Coffee (Koyu Tema)</option>
        <option @click="tema('winter')">Winter (Açık Tema) (Önerilen)</option>
      </select>
    </div>
  </div>
</footer>
</main>
</template>
<script>
export default {
    head() {
        return{
            title: `${this.name} - Ani+`,
            link: [
          {
             rel: 'icon', type: 'image/x-icon', href: 'https://cdn.discordapp.com/attachments/775822548519616562/1002503519716261939/logo.png?size=4096'
          },
          {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
          },
          {
            href: "https://cdn.jsdelivr.net/npm/daisyui@2.24.0/dist/full.css",
            rel: "stylesheet",
            type: "text/css"
          }
          ],
        script: [
          {
            src: "https://kit.fontawesome.com/e0330794a8.js",
            crossorigin: "anonymous"
          },
          {
            src: "https://cdn.tailwindcss.com"
          }
        ]
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
            isMod: '',
            theme: '',
            idss: '',
            useravatar: '',
            loginbutton: '',
        }
    },
    methods: {
        tema(theme) {
          this.theme = theme
          this.$cookies.set('tema', theme)
        },
        redirect(w) {
           if(w == "animes") window.location.href = '/animes'
           if(w == "login") window.location.href = '/oauth2/login'
        },
        logout() {
          this.$cookies.remove('userid')
          this.$cookies.remove('userpassword')
          this.loginbutton = true
          this.$nuxt.refresh
        },
        profil() {
          window.location.href = `/profiles/${this.$cookies.get('userid')}`
        }
    },
    async fetch() {
        if(!this.$cookies.get('tema')) {
            this.theme = 'night'
        }else{
            this.theme = this.$cookies.get('tema')
        }
        let ids;
        if(process.server) {
            const listID = this.$route.params.id
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            if(!this.$cookies.get('userid')) {
        this.loginbutton = true
      }else{
        this.loginbutton = false
        this.useravatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
      }
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
            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))

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
            this.idss = ids

            let covers = [];
            for(let item of animes) {
                const id = JSON.parse(fs.readFileSync(path.join(process.cwd(), `/database/ids.json`), "utf-8"))

                covers.push(`https://cdn.falsis.ga/anime/images?name=${id[item]}`)
            }
            this.covers = covers
        }
    }
}
</script>