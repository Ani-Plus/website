<!--
-------------------------------------------------
- Numarası girilen sezon izlenir.
- Yönlendirme içermez.
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
        <li><a :href="`/animes/${id}/season/${season}`">{{ season }}.Sezon</a></li>
        <li>{{ episode }}.Bölüm</li>
     </ul>
</div>
<div class="divider"></div><br>
<div class="justify-center items-center p-[10px]">
<div class="card bg-base-100 shadow-xl items-center">
    <figure><iframe id="vid" width="840" height="472.5" :src="epdata['urls'][epdata['fansubs'][0]]" frameborder="0" allow="autoplay" allowfullscreen></iframe></figure>
    <span class="card-body">
        <h1 class="card-title">{{ epdata["episodeName"] }}</h1>
        <p>
        {{ epdata["episodeDate"] }} - 
        <i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span id="subs" style="font-size: 15px;">{{ epdata["fansubs"][0] }}</span> - <span class="avatar"><div class="w-4 rounded-full"><img :src="uploader.userAvatar"/></div></span>
        <a style="text-decoration: none;" :href="`/profiles/${uploader.id}`"><b>{{ uploader.name }}</b></a>  <b class="tooltip" data-tip="Moderatör">( <i v-if="uploader.isMod == true" style="font-size: 15px;" class="fa-solid fa-hammer"></i> )</b>  tarafından yüklendi.<br>
        <span>
            {{ epdata["description"] }}
         </span>
        </p>
        <br><br><br>
        <div class="flex flex-row">
          <span class="card-actions justify-start tooltip" data-tip="Önceki Bölüm">
         <button v-if="episode == 1" @click="prev" class="btn btn-error btn-disabled" title="Önceki Bölüm">Önceki Bölüm</button>
         <button v-else @click="prev" class="btn btn-error" title="Önceki Bölüm">Önceki Bölüm</button></span>
         <span class="grow"></span>
        <span class="card-actions justify-center tooltip" :data-tip="'Fansub: ' + epdata['fansubs'][1]">
         <button id="subselect" @click="subselect" class="btn">{{epdata["fansubs"][1] }}</button>
         </span>
         <span class="grow"></span>
         <span class="tooltip card-actions justify-end" data-tip="Sonraki Bölüm">
          <button v-if="database.seasons[`season${this.$route.params.season}`].uploadedEpisodeCount == episode" @click="next" class="btn btn-success btn-disabled" title="Sonraki Bölüm">Sonraki Bölüm</button>
          <button v-else @click="next" class="btn btn-success" title="Sonraki Bölüm">Sonraki Bölüm</button>
          </span>
          </div>
    </span>
</div>
</div>
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
export default{
    head() {
        return{
            title: `${this.defname} ${this.season}.Sezon ${this.episode}. Bölüm - Ani+`,
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
            episode: this.$route.params.episode,
            database: [],
            epdata: [],
            uploader: {},
            theme: '',
            useravatar: '',
            loginbutton: ''
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
          let uploader;
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
            uploader = {
               name: YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/profiles/${database['seasons'][`season${this.$route.params.season}`]['episodes'][`episode${this.$route.params.episode}`].uploaderID}.yaml`), "utf-8")).username,
               id: database['seasons'][`season${this.$route.params.season}`]['episodes'][`episode${this.$route.params.episode}`].uploaderID,
               userAvatar: YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/profiles/${database['seasons'][`season${this.$route.params.season}`]['episodes'][`episode${this.$route.params.episode}`].uploaderID}.yaml`), "utf-8")).useravatar,
               isMod: YAML.parse(fs.readFileSync(path.join(`${process.cwd()}`, `/database/profiles/${database['seasons'][`season${this.$route.params.season}`]['episodes'][`episode${this.$route.params.episode}`].uploaderID}.yaml`), "utf-8")).isMod
            }
            }
            this.uploader = uploader
            this.cover = `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=cover`
            this.banner = `${imagesURL}?${imagesQueries[0]}=${ids[String(this.$route.params.id)]}&${imagesQueries[1]}=banner`
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