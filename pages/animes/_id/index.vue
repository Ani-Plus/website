<!--
-------------------------------------------------
- Params'a ID'si girilen animenin tüm bilgisini burada görüntüler.
- Sezon bilgisine '/season/:season' ve bölüm bilgisine '/season/:season/episode/:episode' yölendirir.
-------------------------------------------------
-->
<template>
<main v-if="defname == null" :data-theme="theme"  class="select-none">
  <div align="center" style="justify-items: center;align-items: center;" class="card">
    <h1 style="font-size: 25px;">OOOOPS! Maalesef, böyle bir anime aslında yok!</h1>
  </div>
</main>
<main v-else :data-theme="theme"  class="select-none">
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
        <li><a href="/animes">Animeler</a></li>
        <li><a :href="`/animes/${id}`">{{ defname }}</a> </li>
     </ul>
</div>
<div class="divider"></div>
<br>
<div class="card lg:card-side card-normal bg-base-100 justify-center items-center p-[10px]">
  <figure><img :src="cover" width="300" height="450"></figure>
  <div class="card-body">
    <h1 class="card-title">{{ defname }}</h1>
    <p>
    {{ info.data.dates.from }} - {{ info.data.dates.to }}<br>
    <i style="font-size: 15px;color:yellow;" class="fa-solid fa-star"></i> {{ info.data.mal.score }} / 10 <a class="link" :href="info.data.mal.url">(MyAnimeList)</a><br> <i style="font-size: 15px;color:royalblue;" class="fa-solid fa-bookmark"></i>  <a href="#sezonlar">{{ info.data.seasonCount }} Sezon</a> - {{ info.data.episodeCount }} Bölüm <br> <i style="font-size: 15px;color:palevioletred;" class="fa-solid fa-eye"></i> {{ info.data.type.replaceAll("TV", "Dizi") }}<br>
    <i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">{{ info.data.isCompleted ? "TAMAMLANDI" : "YAYINLANIYOR" }}</span><br>
    <i style="font-size:13px;color:palevioletred;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">Bölüm Başına Ortalama {{ info.data.minsPerEP }} dakika</span><br>
    <span v-for="item of info.data.genres" v-bind:key="item" class="badge badge-secondary tooltip" :data-tip="'Tür: ' + item">{{ item }}</span>
  <br><br>
<span>{{ info.data.descriptions.tr }}</span>
</p>
</div>
</div>
<div v-if="charcount == 0 && !charcount && charcount == '' || charcount == null"></div>
<div v-else class="tabs tabs-boxed items-center justify-center bg-transparent">
  <a @click="seasonstab()" id="sezontab" class="tab tab-active">Sezonlar</a> 
  <a @click="charstab()" id="karaktertab" class="tab">Karakterler</a>
  <a id="yorumltab" class="tab cursor-not-allowed">Yorumlar</a>
</div>
<div id="seasons" class="visible">
<div class="divider"></div>
<h2 id="sezonlar" style="font-size: 25px;" align="center">Sezonlar ({{ info.data.seasonCount }})</h2>
<div v-if="database.uploadedSeasonCount == 0" class="justify-center items-center" align="center">Hiçbir Sezon Bulunamadı.</div>
<div v-else class="flex-row flex flex-wrap items-center justify-center">
<div v-for="item in Object.keys(database.seasons)" v-bind:key="item"  class="p-[20px] card lg:card-side bg-base-100">
<figure><a :href="`/animes/${id}/season/${parseInt(Object.keys(database.seasons).indexOf(item)) + 1}`"><img :src="database.seasons[`${item}`].seasonCover" width="800" height="550"></a></figure>
<span class="card-body">
<span class="card-title">{{ database.seasons[`${item}`].seasonName }}</span>
<p>
  {{ database.seasons[`${item}`].description }}
</p>
<div class="card-actions justify-end">
      <button class="btn btn-primary" @click="git(`/animes/${id}/season/${parseInt(Object.keys(database.seasons).indexOf(item)) + 1}`)">Git</button>
</div>
</span>
</div>
</div>
</div>
<div v-if="charcount == 0 && !charcount && charcount == '' || charcount == null"></div>
<div v-else id="chars" class="hidden">
<br>
<div class="divider"></div>
<h2 id="karakterler" style="font-size: 25px;" align="center">Karakterler ({{ charcount }})</h2>
<br>
<div v-for="item of char" v-bind:key="item" class="p-[20px] card lg:card-side bg-base-100 justify-center items-center p-[10px]">
  <figure><img :src="item.image" width="232" height="375,3"></figure>
  <div class="card-body">
    <h1 class="card-title">{{ item.names.default }}</h1>
    <p>
    İlk Görünme: {{ item.debut.anime }}<br>
    Takma Ad(lar): {{ item.names.nicknames[0] == "none" ? "Takma Adı Yok" : item.names.nicknames.join(", ") }}<br>
    Cinsiyet: {{ item.gender == 'male' ? 'Erkek' : item.gender == 'female' ? 'Kız/Kadın' : 'Bilinmiyor' }}<br>
    Yaş: {{ item.age }}<br>
    {{ item.description }}<br><br>
</p>
<div class="card-actions justify-end">
      <button class="btn btn-primary" @click="git(item.fandom)"><img width="20px" height="20px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Fandom_heart-logo.svg/1200px-Fandom_heart-logo.svg.png"></button>
</div>
</div>
</div>
</div>
<br><br>
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
let baseURL = `https://cdn.falsis.ga`;
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
            cover: '',
            banner: '',
            info: [],
            defname: [],
            id: this.$route.params.id,
            database: [],
            seasoncount: [],
            theme: '',
            useravatar: '',
            loginbutton: '',
            char: [],
            charcount: ''
        }
    },
    methods: {
        tema(theme) {
          this.theme = theme
          this.$cookies.set('tema', theme)
        },
        git(i) {
          window.location.href = i
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
        },
        seasonstab() {
          document.getElementById("seasons").className = "visible"
          document.getElementById("sezontab").className = "tab tab-active"
          document.getElementById("chars").className = "hidden"
          document.getElementById("karaktertab").className = "tab"
        },
        charstab() {
          document.getElementById("seasons").className = "hidden"
          document.getElementById("sezontab").className = "tab"
          document.getElementById("chars").className = "visible"
          document.getElementById("karaktertab").className = "tab tab-active"
        }
    },
    async fetch() {
        try {
          if(!this.$cookies.get('tema')) {
            this.theme = 'night'
          }else{
            this.theme = this.$cookies.get('tema')
          }
            let database;
            let ids;
            if (process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            this.char = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/animes/${this.$route.params.id}.yaml`), 'utf-8')).characters
            this.charcount = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/animes/${this.$route.params.id}.yaml`), 'utf-8')).characterCount
            if(!this.$cookies.get('userid')) {
        this.loginbutton = true
      }else{
        this.loginbutton = false
        this.useravatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
      }
            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            if(!ids[this.$route.params.id]) {
              database = null
            }else{
            if(!fs.existsSync(path.join(`${process.cwd()}`, `/database/animes/${this.$route.params.id}.yaml`))) {
            database = null
            }else{
            database = YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/animes/${this.$route.params.id}.yaml`), "utf-8"))
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