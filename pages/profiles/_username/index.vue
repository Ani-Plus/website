<!--
-------------------------------------------------
- Doğrudan kullanıcı idsi girilen kullanıcının profilini gösterir.
- '/list' klasörüne yönlendirme içerir.
-------------------------------------------------
-->
<template>
    <main v-if="error == true" :data-theme="theme"  class="select-none">
        <div align="center" style="justify-items: center;align-items: center;" class="card">
            <h1>OOOOPS! Maalesef, böyle bir profil aslında yok!</h1>
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
          <img :src="uavatar" />
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
        <li>Kullanıcılar</li>
        <li>{{ username }}</li>
     </ul>
</div>
<div class="divider"></div><br>
<div class="p-[10px]">
        <div class="card lg:card-side p-[10px]">
            <figure>
                <div class="avatar online">
                <div class="w-24 rounded-full">
                    <img :src="useravatar" class="profileavatar">
                </div>
            </div>
            </figure>
                <span class="card-body">
                    <h1 style="font-size: 15px;">{{ username }}  <span v-if="isMod == true" class="badge badge-mg badge-primary">MOD</span></h1>
                    Kullanıcı Kimliği: {{ userid }}<br>
                    Üyelik Durumu: {{ isMod ? 'Yetkili' : 'Üye' }}
                </span><br><br>
            <div class="card-actions justify-end">
                <button v-if="isowner == true || isUserAdmin == true" @click="profileedit()" class="btn btn-primary"><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
        </div>
        <br><br>
        <div class="card lg:card-side text-neutral-content p-[10px]">
        <div class="stats bg-primary text-primary-content">
  
        <div class="stat">
        <div class="stat-title">Seçilen Tema</div>
        <div class="stat-value" id="tema">{{ theme }}</div>
        <div class="stat-actions text-white">
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

        <div class="stat">
        <div class="stat-title">Listeler</div>
        <div class="stat-value">{{ listsCount }}</div>
        <div class="stat-actions">
        <button class="btn btn-sm">Oluştur</button> 
        </div>
        </div>
        <div class="stat">
        <div class="stat-title">Eklenen Animeler</div>
        <div class="stat-value">{{ addedAnimes }}</div>
        <div class="stat-actions">
        <button class="btn btn-sm">Ekle</button> 
        </div>
        </div>
        <div class="stat">
        <div class="stat-title">Yüklenen Bölümler</div>
        <div class="stat-value">{{ uploadedEpisodes }}</div>
        <div class="stat-actions">
        <button class="btn btn-sm">Yükle</button> 
        </div>
        </div>
        </div>
        </div>
</div>
        <br>
        <div align="center">
            <h2 class="text-xl"> Kullanıcının Listeleri </h2>
        </div><br>
        <div v-if="lists == null" align="center">
            Kullanıcının Herhangi bir listesi bulunmamaktadır.
        <br><br>
        </div>
        <div class="flex flex-wrap flex-row">
            <a v-for="id of lists" v-bind:key="id" :href="`/lists/${id}`" class="tooltip" :data-tip="listinfo[id].name">
                <img :src="covers[lists.indexOf(id)]" style="padding: 10px;" width="187.5px" height="262.5px">
            </a>
        </div>
        <div class="divider"></div>
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
            title: `${this.username} - Ani+`,
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
            username: '',
            userid: this.$route.params.username,
            useravatar: '',
            isMod: '',
            lists: [],
            covers: [],
            error: '',
            theme: '',
            listobj: {},
            listinfo: {},
            uavatar: '',
            loginbutton: '',
            isowner: '',
            isUserAdmin: '',
            uploadedEpisodes: '',
            addedAnimes: '',
            listsCount: ''
        }
    },
    methods: {
      tema(theme) {
          this.theme = theme
          this.$cookies.set('tema', theme)
          document.getElementById("tema").innerText = theme
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
        profileedit() {
          window.location.href = `/profiles/${this.$route.params.username}/edit`
        }
    },
    async fetch() {
        let ids;
        if(process.server) {
          const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            /*if(!this.$route.query.avatarurl && this.$route.query.avatarurl == undefined && this.$route.query.avatarurl == '' && this.$route.query.avatarurl == null) {
              //demektir ki ya profil editlenmemiş ya da avatarurli değiştirilmemiş
              if(!this.$route.query.username && this.$route.query.username == undefined && this.$route.query.username == '' && this.$route.query.username == null) {
                //demektir ki ya profil düzenlenmemiş ya da hem avatarurl hem username değiştirilmemiş
                if(!this.$route.query.password && this.$route.query.password == undefined && this.$route.query.password == '' && this.$route.query.password == null) {
                  //demektir ki ya profil düzenlenmemiş ya da hem avatarurl hem username hem de password değiştirilmemiş
                  if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                    //demektir ki profil düzenlenmemiş
                    // \\
                    // \\
                    // \\
                  }else{
                    //demektir ki mod değiştirilmiş ama  hem avatarurl hem username hem de password değiştirilmemiş
                    let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["isMod"] = this.$route.query.mod == 'on' //boolean
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                    // fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), `username: "${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).username}"\nuserid: "${this.$route.params.username}"\nuserpassword: ${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).userpassword}\nstatus: "offline"\nuseravatar: "${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).useravatar}"\nisMod: ${this.$route.query.mod == 'on'}\nuploadedEpisodes: ${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).uploadedEpisodes}\naddedAnimes: ${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).addedAnimes}\nlistCount: ${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).listCount}\nlists: ${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).lists}\nanimes: ${YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`))).animes}`)
                  }
                }else{
                  //demektir ki hem avatarurl hem username değiştirilmemiş ama password veya daha fazlası değiştirilmiş
                  if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                    //demektir ki password dışında hiçbiri değiştirilmemiş
                    let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["userpassword"] = this.$route.query.password //string
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                  }else{
                    //demektir ki avatarurl ve username değiştirilmemiş ama password ve mod değiştirilmiş
                    let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["isMod"] = this.$route.query.mod == 'on' //boolean
                    userdata["userpassword"] = this.$route.query.password //string
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                  }
                }
              }else{
                //demektir ki avatarurl değiştirilmemiş ama username veya daha fazlası değiştirilmiş
                if(!this.$route.query.password && this.$route.query.password == undefined && this.$route.query.password == '' && this.$route.query.password == null) {
                  //demektir ki hem avatarurl hem password değiştirilmemiş ama username değiştirilmiş
                  if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                    //demektir ki hem avatarurl hem password hem de mod değiştirilmemiş ama username değiştirilmiş
                    let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["username"] = this.$route.query.username
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                  }else{
                    //demektir ki avatarurl ve password değiştirilmemiş ama mod ve username değiştirilmiş
                    let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["username"] = this.$route.query.username
                    userdata["isMod"] = this.$route.query.mod == 'on'
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                  }
              }else{
                //demektir ki avatarurl değiştirilmemiş ama username, password veya daha fazlası değiştirilmiş
                if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                    //demektir ki avatarurl ve mod değiştirilmemiş ama username ve password değiştirilmiş
                    let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["username"] = this.$route.query.username
                    userdata["userpassword"] = this.$route.query.password
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                  }else{
                    //demektir ki avatarurl dışında hepsi değiştirilmiş
                    let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["username"] = this.$route.query.username
                    userdata["userpassword"] = this.$route.query.password
                    userdata["isMod"] == this.$route.query.mod == 'on'
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                  }
              }
            }
          }else{
            //demektir ki avatarurl veya daha fazlası değiştirilmiş
            if(!this.$route.query.username && this.$route.query.username == undefined && this.$route.query.username == '' && this.$route.query.username == null) {
              //demektir ki avatarurl veya daha fazlası değiştirilmiş ama username değiştirilmemiş
              if(!this.$route.query.password && this.$route.query.password == undefined && this.$route.query.password == '' && this.$route.query.password == null) {
                //demektir ki avatarurl veya daha fazlası değiştirilmiş ama password ve username değiştirilmemiş
                if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                  //demektir ki avatarurl dışında hiçbiri değiştirilmemiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                  userdata["avatarurl"] = this.$route.query.avatarurl
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }else{
                  //demektir ki avatarurl ve mod dışında hiçbiri değiştirilmemiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                  userdata["avatarurl"] = this.$route.query.avatarurl
                  userdata["isMod"] = this.$route.query.mod == 'on'
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }
              }else{
                //demektir ki avatarurl, password veya daha fazlası değiştirilmiş ama username değiştirilmemiş
                if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                  //demektir ki avatarurl ve passwırd dışında hiçbiri değiştirilmemiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                    userdata["password"] = this.$route.query.password
                    userdata["avatarurl"] = this.$route.query.avatarurl
                    fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }else{
                  //demektir ki avatarurl, password ve mod dışında hiçbiri değiştirilmemiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                  userdata["avatarurl"] = this.$route.query.avatarurl
                  userdata["userpassword"] = this.$route.query.password
                  userdata["isMod"] = this.$route.query.mod == 'on'
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }
              }
            }else{
              //demektir ki avatarurl, username veya daha fazlası değiştirilmiş
              if(!this.$route.query.password && this.$route.query.password == undefined && this.$route.query.password == '' && this.$route.query.password == null) {
                //demektir ki avatarurl, username veya daha fazlası değiştirilmiş ama password değiştirilmemiş
                if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                  //demektir ki avatarurl ve username dışında hiçbiri değiştirilmemiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                  userdata["avatarurl"] = this.$route.query.avatarurl
                  userdata["username"] = this.$route.query.username
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }else{
                  //demektir ki avatarurl, username ve mod dışında hiçbiri değiştirilmemiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                  userdata["avatarurl"] = this.$route.query.avatarurl
                  userdata["username"] = this.$route.query.username
                  userdata["isMod"] = this.$route.query.mod == 'on'
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }
              }else{
                //demektir ki avatarurl, password, username veya daha fazlası değiştirilmiş
                if(!this.$route.query.mod && this.$route.query.mod == undefined && this.$route.query.mod == '' && this.$route.query.mod == null) {
                  //demektir ki avatarurl, username ve password dışında hiçbiri değiştirilmemiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                  userdata["avatarurl"] = this.$route.query.avatarurl
                  userdata["userpassword"] = this.$route.query.password
                  userdata["username"] = this.$route.query.username
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }else{
                  //demektir ki hepsi değiştirilmiş
                  let userdata = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`)))
                  userdata["avatarurl"] = this.$route.query.avatarurl
                  userdata["username"] = this.$route.query.username
                  userdata["userpassword"] = this.$route.query.password
                  userdata["isMod"] = this.$route.query.mod == 'on'
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userdata))
                }
              }
            }
          }*/
          if(!this.$cookies.get('userid')) {
            this.isowner = false
        this.loginbutton = true
          }else{
            this.loginbutton = false
            this.isowner = this.$cookies.get('userid') == this.$route.params.username
            this.uavatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
              }
          if(!this.$cookies.get('tema')) {
            this.theme = 'night'
          }else{
            this.theme = this.$cookies.get('tema')
          }
            const userid = this.$route.params.username
            if(fs.existsSync(path.join(process.cwd(), `/database/profiles/${userid}.yaml`)) == false) {
                this.error = true
            }else {
            const userinfo = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${userid}.yaml`), "utf-8"))
            const onlineuser = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), "utf-8"))

            this.isUserAdmin = onlineuser.isMod
            ids = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/database/ids.json")))
            if(!userinfo.lists){
                this.lists = null
            }else{
                let listinfo;
                let listcovers = [];
                for(let item of userinfo.lists) {
                listinfo = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/lists/${item}.yaml`), "utf-8"))
                this.listinfo[item] = listinfo
                listcovers.push(`https://cdn.falsis.ga/anime/images?name=${ids[listinfo["animes"][0]]}&type=cover`)
                }
                this.lists = userinfo.lists //array
                userinfo.lists.forEach((item) => this.listobj[item] = "value")
                this.covers = listcovers
            }
            this.username = userinfo.username //string
            this.userid = userid //string
            this.useravatar = userinfo.useravatar //string
            this.isMod = userinfo.isMod //boolean
            this.uploadedEpisodes = userinfo.uploadedEpisodes
            this.addedAnimes = userinfo.addedAnimes
            this.listsCount = userinfo.listsCount
            this.error = false
            if(!this.$route.query.avatarurl && this.$route.query.avatarurl == null) {
              //avatarurl değiştirilmemiş
              this.$nuxt.refresh
            }else{
              //avatarurl değiştirilmiş
                  userinfo["useravatar"] = String(this.$route.query.avatarurl)
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userinfo))
            }
            if(!this.$route.query.username && this.$route.query.username == null) {
              //username değiştirilmemiş
              this.$nuxt.refresh
            }else{
              //username değiştirilmiş
              userinfo["username"] = String(this.$route.query.username)
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userinfo))
            }
            if(!this.$route.query.password && this.$route.query.password == null) {
              //şifre değiştirilmemiş
              this.$nuxt.refresh
            }else{
              //şifre değiştirilmiş
              userinfo["userpassword"] = String(this.$route.query.password)
                  fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userinfo))
            }
            if(!this.$route.query.mod && this.$route.query.mod == null || this.$route.query.mod == userinfo.isMod) {
              //mod değiştirilmemş
              this.$nuxt.refresh
            }else {
              //mod değiştirilmiş
              userinfo["isMod"] = this.$route.query.mod == 'on'
              fs.writeFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), YAML.stringify(userinfo))
            }
            }
        }
    }
}
</script>