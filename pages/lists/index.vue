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
        <li>Listeler</li>
     </ul>
</div>
        <div class="divider"></div><br>
        <div align="center">
            <h1 style="font-size: 25px;">Listeler</h1>
        </div>
        <div class="flex-row flex-wrap flex">
           <a v-for="like of lists.likes" v-bind:key="like" :href="`/lists/${lists.ids[lists.likes.indexOf(like)]}`" target="_blank" class="tooltip" :data-tip="lists.names[lists.likes.indexOf(like)]"><img :src="lists.covers[lists.likes.indexOf(like)]" style="padding: 5px;" width="250px" height="350px"></a>
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
        return {
            lists: {
                ids: [],
                covers: [],
                likes: [],
                names: [],
                theme: '',
                useravatar: '',
                loginbutton: ''
            }
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
        let ids;
        if(!this.$cookies.get('tema')) {
            this.theme = 'night'
        }else{
            this.theme = this.$cookies.get('tema')
        }
        if(process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            if(!this.$cookies.get('userid')) {
              this.loginbutton = true
            }else{
              this.loginbutton = false
              this.useravatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
            }
            const lists = YAML.parse(fs.readFileSync(path.join(process.cwd(), "/database/lists.yaml"), "utf-8"))
            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            let likes = [];
            let coverarts = [];
            let idss = [];
            let n = [];
            for(let item of lists["lists"]) {
                let cvr = ids[YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))["animes"][0]]
                likes.push(YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))["likes"])
                coverarts.push(`https://cdn.falsis.ga/anime/images?name=${cvr}&type=cover`)
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