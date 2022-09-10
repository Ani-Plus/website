<!--
-------------------------------------------------
- Ani-Plus Web Sitesindeki Bütün Animeleri MyAnimeList Puanlarına Göre Sıralar.
- Anime Sayfasına Yönlendirme içerir '/:id'
-------------------------------------------------
-->
<template>
<main :data-theme="theme"  class="select-none">
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
        <li>Animeler</li>
     </ul>
</div>
<div class="divider"></div><br>
<h1 align="center">Yüklenmiş Animeler</h1><br><br>
 <div v-for="item of scoresort" v-bind:key="item" class="card lg:card-side card-normal bg-base-100 justify-center p-[10px]">
    <figure><a :href="`/animes/${Object.keys(ids)[Object.values(ids).indexOf(Object.values(ids).find(arr => arr.includes(item[0])))]
}`"><img :src="`https://cdn3.falsisdev.repl.co/anime/images?name=${item[0]}&type=cover`" width="300" height="450"></a></figure>
<span class="card-body">
  <h1 class="card-title">{{ info[item[0]].names.default }}</h1>
  <p>
  {{ info[item[0]].dates.from }} - {{ info[item[0]].dates.to }}<br>
  <i style="font-size: 15px;color:yellow;" class="fa-solid fa-star"></i> {{ info[item[0]].mal.score }} / 10 <a class="link" :href="info[item[0]].mal.url">(MyAnimeList)</a><br>
  <i style="font-size: 15px;color:royalblue;" class="fa-solid fa-bookmark"></i> <a :href="`/animes/${Object.keys(ids)[Object.values(ids).indexOf(Object.values(ids).find(arr => arr.includes(item[0])))]
}#sezonlar`">{{ info[item[0]].seasonCount }} Sezon</a> - {{ info[item[0]].episodeCount }} Bölüm <br>
<i style="font-size: 15px;color:palevioletred;" class="fa-solid fa-eye"></i> {{ info[item[0]].type.replaceAll("TV", "Dizi") }}<br>
<i style="font-size:13px;color:paleturquoise;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">{{ info[item[0]].isCompleted ? "TAMAMLANDI" : "YAYINLANIYOR" }}</span><br>
    <i style="font-size:13px;color:palevioletred;" class="fa-solid fa-circle"></i> <span style="font-size: 15px;">Bölüm Başına Ortalama {{ info[item[0]].minsPerEP }} dakika</span><br>
    <span v-for="item of info[item[0]].genres" v-bind:key="item" class="badge badge-secondary tooltip" :data-tip="'Tür: ' + item">{{ item }}</span>
    </p>
</span>
<br>
 </div><br>
 <div class="divider"></div><br>
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
            info: [],
            scoresort: [],
            ids: [],
            theme: '',
            loginbutton: '',
            useravatar: ''
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
        try {
            let aa;
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