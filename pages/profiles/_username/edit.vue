<template>
    <main v-if="isOwner == false && onlineuserinfo.isMod == false" :data-theme="theme"  class="select-none">
        YETKİLİ DEĞİLSİN.
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
                <li>{{ userinfo.username }}</li>
                <li>Profili Düzenle</li>
            </ul>
        </div>
        <div class="divider"></div><br>
        <div class="p-[10px]">
            <div class="card :card-side p-[10px]">
                <form name="profileedit" :action="`/profiles/${userinfo.userid}`">
                    <figure>
                        <div class="avatar online pr-[5px]">
                            <div class="w-24 rounded-full">
                                <img :src="userinfo.useravatar">
                            </div>
                        </div>
                        <div class="form-control w-full max-w-xs p-[2px]">
                            <label class="label">
                                <span class="label-text">Avatar URL</span>
                            </label>
                            <input type="text" name="avatarurl" placeholder="Yeni Avatar URL'sini gir." class="input input-bordered w-full max-w-xs" />
                        </div>
                    </figure>
                    <figure>
                        <div class="avatar online pr-[100px]">
                        </div>
                        <div class="form-control w-full max-w-xs p-[2px]">
                            <label class="label">
                                <span class="label-text">Kullanıcı Adı</span>
                            </label>
                            <input type="text" name="username" placeholder="Yeni Kullanıcı Adını Gir." class="input input-bordered w-full max-w-xs" />
                        </div>
                    </figure>
                    <figure>
                        <div class="avatar online pr-[100px]">
                        </div>
                        <div class="form-control w-full max-w-xs p-[2px]">
                            <label class="label">
                                <span class="label-text"><span class="text-error"><i class="fa-solid fa-triangle-exclamation"></i></span>  Şifre</span>
                            </label>
                            <input type="text" name="password" placeholder="Yeni Şifreyi Girin." class="input input-bordered input-error w-full max-w-xs" />
                        </div>
                    </figure>
                    <figure v-if="onlineuserinfo.isMod == true">
                        <div class="avatar online pr-[100px]">
                        </div>
                        <div class="form-control w-full max-w-xs p-[2px]">
                            <div class="form-control">
                                <label class="cursor-pointer label">
                                    <span class="label-text">Kullanıcıyı Moderatör olarak ata.</span>
                                    <input type="checkbox" name="mod" :checked="userinfo.isMod ? 'on' : 'off'" class="checkbox checkbox-accent" />
                                </label>
                            </div>
                        </div>
                    </figure>
                    <figure>
                        <div class="avatar online pr-[340px]">
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Kaydet</button>
                        </div>
                    </figure>
                </form>
            </div>
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
            title: `Profili Düzenle - Ani+`,
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
            userinfo: {
                username: '',
                userid: '',
                userpassword: '',
                status: '',
                useravatar: '',
                isMod: '',
                lists: '',
                animes: ''
            },
            onlineuserinfo: {
                isMod: ''
            },
            isOwner: '',
            loginbutton: '',
            uavatar: '',
            theme: ''
        }
    },
    methods: {
        tema(theme) {
            this.theme = theme
            this.$cookies.set('tema', theme)
        },//tema(...)
        redirect(w) {
            switch(w) {
                case 'animes':
                window.location.href = '/animes'
                break;
                case 'login':
                window.location.href = '/oauth2/login'
                break;
                case 'register':
                window.location.href = '/oauth2/register'
                break;
            }
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
        if(process.server) {
            const fs = require('fs');
            const path = require('path');
            const YAML = require('yaml');
            if(!this.$cookies.get('userid')) {
                this.isOwner = false
                this.loginbutton = true
                this.onlineuserinfo.isMod = false
            }else{
                this.loginbutton = false
                this.isOwner = this.$cookies.get('userid') == this.$route.params.username
                this.uavatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
                this.onlineuserinfo.isMod = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).isMod
            }
            if(!this.$cookies.get('tema')) {
                this.theme = 'night'
            }else{
                this.theme = this.$cookies.get('tema')
            }
            const uinf = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$route.params.username}.yaml`), 'utf-8'))

            this.userinfo.username = uinf.username
            this.userinfo.userid = uinf.userid
            this.userinfo.userpassword = uinf.userpassword
            this.userinfo.status = uinf.status
            this.userinfo.useravatar = uinf.useravatar
            this.userinfo.isMod = uinf.isMod
            this.userinfo.lists = uinf.lists
            this.userinfo.animes = uinf.animes
        }
    }
}
</script>