<!--
-------------------------------------------------
- Ani-Plus Web Sitesinin Ana Sayfasıdır.
- Bu Dosya yalnızca sitenin '/' sayfasını içerir.
-------------------------------------------------
-->
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
    <div class="hero min-h-screen" style="background-image: url(https://i.pinimg.com/originals/31/72/f8/3172f8818630d5d2f9ccaf051e694d18.jpg);">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Ani+ - Türkçe Anime İzleme Sitesi</h1>
          <p class="mb-5">Ani+, bulabileceğiniz bütün animelerin sorunsuz bir şekilde Türkçe altyazılı izlemenizi sağlamak için kurulduk!</p>
          <button class="btn btn-primary" @click="redirect('animes')">Animeleri Keşfet!</button>
        </div>
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
let baseURL = `https://cdn3.falsisdev.repl.co`;
let imagesURL = `${baseURL}/anime/images`
let infoURL = `${baseURL}/anime/info`
let imagesquery = [
    "name",
    "type",
    "order"
]
let infoquery = [
    "name"
]
export default {
    head() {
        return{
            title: `Anasayfa - Ani+`,
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
            loginbutton: '',
            useravatar: '',
            theme: ''
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
        try {
          if(process.server) {
            const fs = require('fs')
            const path = require('path')
            const YAML = require("yaml")
            if(!this.$cookies.get('tema')) {
                this.theme = 'night'
            }else{
                this.theme = this.$cookies.get('tema')
            }
            if(!this.$cookies.get('userid')) {
              if(!this.$route.query.userid) {
              //demektir ki giriş yapılmamış
              this.loginbutton = true
              }else{
              //demektir ki giriş yapıldıktan sonra yönlendirilmiş
              if(YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/ids.yaml`), 'utf-8'))['ids'].includes(this.$route.query.userid)) {
                //şifre doğru
                if(YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.query.userid}.yaml`), 'utf-8')).userpassword == this.$route.query.userpassword) {
                  //giriş bilgileri kaydedildi ve giriş yapıldı
                  this.$cookies.set('userid', this.$route.query.userid)
                  this.$cookies.set('userpassword', this.$route.query.userpassword)
                  this.loginbutton = false
                  this.useravatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.query.userid}.yaml`), 'utf-8')).useravatar
                  
                }else{
                  //şifre yanlış
                  this.loginbutton = true
                }
              }else{
                //kullanıcı yok
                this.loginbutton = true
              }
              }
            }else{
              //demektir ki zaten giriş bilgileri kayıtlı
              this.loginbutton = false
              this.useravatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
            }
          }
        }catch(err) {
            console.log(err)
        }
    }
}
</script>