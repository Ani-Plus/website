<!--
-------------------------------------------------
- Numarası girilen sezonun tüm bilgisi görüntülenir.
- Bölüme yönlendirir '/episode/:episode'
-------------------------------------------------
-->
<template>
<main :data-theme="theme">
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
        <li>{{ season }}.Sezon</li>
     </ul>
</div>
<div class="divider"></div>
<br>
 <div class="card lg:card-side card-normal bg-base-100 justify-center items-center p-[10px]">
    <figure><img :src="database.seasons[`season${season}`].seasonCover" width="300" height="450"></figure>
    <div class="card-body">
        <h1 class="card-title">{{ database.seasons[`season${season}`].seasonName }}</h1>
        <p>
        <i style="font-size: 15px;color:yellow;" class="fa-solid fa-star"></i> {{ info.data.mal.score }}/ 10 <a class="link" href="https://myanimelist.net">(MyAnimeList)</a><br> <i style="font-size: 15px;color:royalblue;" class="fa-solid fa-bookmark"></i>  <a href="#bolumler">{{ database.seasons[`season${season}`].episodeCount }} Bölüm</a><br>
            <i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">{{ database.seasons['season' + season].isCompleted ? "TAMAMLANDI" : "YAYINLANIYOR" }}</span><br>
    <i style="font-size:13px;color:palevioletred;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">Bölüm Başına Ortalama {{ info.data.minsPerEP }} dakika</span><br>
    <span v-for="item of info.data.genres" v-bind:key="item" class="badge badge-secondary tooltip" :data-tip="'Tür: ' + item">{{ item }}</span><br><br>
    <span>
        {{ database.seasons[`season${season}`].description }}
    </span>
    </p>
    </div>
 </div><br>
 <div class="p-[10px] pl-[50px]"><i class="fa-solid fa-music"></i> <a :href="op.url">Açılış Teması: {{ op.name }} by {{ op.artist }} / {{ op.duration }}</a><br>
  <i class="fa-solid fa-circle-play"></i> <a :href="trailer">Sezon Fragmanı</a></div>
 <div class="divider"></div> 
 <br>
 <h2 id="bolumler" align="center">Bölümler ({{ database.seasons[`season${season}`].episodeCount }})</h2><br>
 <div v-if="database.seasons[`season${season}`].episodeCount == database.seasons[`season${season}`].uploadedEpisodeCount == false" class="pl-[10px] pr-[10px]">
 <div class="alert alert-info shadow-lg items-center justify-center">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>Görünüşe göre bu sezonun var olan bütün bölümleri henüz sisteme eklenmemiş.</span>
  </div>
</div>
</div>
<div class="flex-row flex flex-wrap items-center justify-center">
 <span v-for="item in Object.keys(database.seasons[`season${season}`]['episodes'])" v-bind:key="item"  class="p-[10px] card w-96 bg-base-100">

    <figure><a :href="`/animes/${id}/watch/season/${season}/episode/${Number(Object.keys(database.seasons['season' + season]['episodes']).indexOf(item)) + 1}`"><img width="400" height="225" class="episodecover" :src="database.seasons[`season${season}`]['episodes'][item].episodePreview"></a></figure>
    <span class="card-body">
        <h1 class="card-title">Bölüm {{ Number(Object.keys(database.seasons['season' + season]['episodes']).indexOf(item)) + 1 }}: {{ database.seasons[`season${season}`]['episodes'][item]["episodeName"].length > 18 ?  database.seasons[`season${season}`]['episodes'][item]["episodeName"].substring(0, 15) + '...' : database.seasons[`season${season}`]['episodes'][item]["episodeName"]}}</h1> 
        <p>{{ database.seasons[`season${season}`]['episodes'][item].description.length > 76 ? database.seasons[`season${season}`]['episodes'][item].description.substring(0, 73) + '...' : database.seasons[`season${season}`]['episodes'][item].description }}</p></span><br>
        <div class="card-actions justify-end">
      <button @click="izle(`/animes/${id}/watch/season/${season}/episode/${Number(Object.keys(database.seasons['season' + season]['episodes']).indexOf(item)) + 1}`)" class="btn btn-primary">İzle</button>
    </div>
  </span></div><br><br>
<div v-if="database.uploadedSeasonCount == season == false" align="center" style="padding: 10px;">
    <button class="btn btn-primary" @click="next(`/animes/${id}/season/${parseInt(season) + 1}`)">Sonraki Sezon</button>
</div>
<div v-if="season == '1' == false && season == '0' == false" align="center" style="padding: 10px;">
    <button class="btn btn-primary" @click="next(`/animes/${id}/season/${parseInt(season) - 1}`)">Önceki Sezon</button>
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
let baseURL = `https://cdn3.falsisdev.repl.co`;
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
            title: `${this.defname} - Ani+`,
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
            season: this.$route.params.season,
            op: '',
            database: [],
            seasoncount: [],
            theme: '',
            useravatar: '',
            loginbutton: '',
            trailer: ''
        }
    },
    methods: {
        next(i) {
            window.location.href = i
        },
        izle(bolum) {
            window.location.href = bolum
        },
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
            if(!this.$cookies.get('userid')) {
        this.loginbutton = true
      }else{
        this.loginbutton = false
        this.useravatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
      }
            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            if(!fs.existsSync(path.join(`${process.cwd()}`, `/database/animes/${this.$route.params.id}.yaml`))) {
            database = null
            }else{
            database = YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/animes/${this.$route.params.id}.yaml`), "utf-8"))
            }
            }
            this.cover = `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=cover`
            this.banner = `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=banner`
            this.database = database
            let sc = database.uploadedSeasonCount
            this.seasoncount = sc
            this.info = await fetch(`${infoURL}?name=${ids[String(this.$route.params.id)]}`).then(response => response.json())
            this.defname = this.info.data.names.default
            this.op = database.seasons[`season${this.$route.params.season}`].openingtheme
            this.trailer = database.seasons[`season${this.$route.params.season}`].trailer
        }catch(err) {
            console.log(err)
        }
    }
}
</script>