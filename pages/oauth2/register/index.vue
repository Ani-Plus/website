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
        </div><!-- navbar -->
        <div class="text-sm breadcrumbs" style="padding-left: 100px;">
            <ul>
                <li><a href="/">Ana Sayfa</a></li>
                <li>Kayıt Ol</li>
            </ul>
        </div><!-- breadcrumbs -->
        <br>
        <div class="hero min-h-screen bg-base-200" style="background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/218894fb-2ed2-4a32-b4dd-7e017fccd106/df2b9e6-b4be8ccf-a37c-400d-acf9-458c8be1924e.jpg/v1/fill/w_1280,h_720,q_75,strp/4k_anime_wallpaper_for_pc_by_rockydevilweeb_df2b9e6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMjE4ODk0ZmItMmVkMi00YTMyLWI0ZGQtN2UwMTdmY2NkMTA2XC9kZjJiOWU2LWI0YmU4Y2NmLWEzN2MtNDAwZC1hY2Y5LTQ1OGM4YmUxOTI0ZS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.TsVYlRixl5gXD50UA1aPVY9Jb5BuPiKi3m3dWIdoILs);">
            <div class="hero-overlay bg-opacity-60"></div>
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-center">
                    <h1 class="text-5xl font-bold">Kayıt Ol!</h1>
                    <p class="py-6">Ani+ sistemlerinden olan liste oluşturma, düzenleme, silme; anime ekleme, silme; bölüm ekleme, düzenleme, silme; istatistiklere erişim; profil düzenleme, görüntüleme gibi özelliklere etişmek için kayıt olun ve ardından giriş yapın!</p><br>
                    <h1 class="text-3xl">Zaten bir hesabın var mı?</h1><br>
                    <button class="btn btn-primary" @click="redirect('login')">Giriş Yap!</button>
                </div>
                <br>
                <div class="card flex-shrink-0 w-full max-w-sm bg-base-100">
                    <div class="card-body">
                        <form name="register" action="/oauth2/login">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Kullanıcı Adı</span>
                                </label>
                                <input name="username" type="text" placeholder="Kullanıcı Adı" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Şifre</span>
                                </label>
                                <input name="userpassword" type="password" placeholder="Şifre" class="input input-bordered" />
                            </div>
                            <div class="form-control mt-6">
                                <button type="submit" class="btn btn-primary">Kayıt Ol</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div><!-- Login Form -->
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
                title: 'Giriş Yap - Ani+',
                link: [
                    {
                        rel: 'icon',
                        type: 'image/x-icon',
                        href: 'https://cdn.discordapp.com/attachments/775822548519616562/1002503519716261939/logo.png?size=4096'
                    },
                    {
                        rel: 'stylesheet',
                        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                    },
                    {
                        rel: 'stylesheet',
                        type: 'text/css',
                        href: 'https://cdn.jsdelivr.net/npm/daisyui@2.24.0/dist/full.css'
                    }
                ],//link
                script: [
                    {
                        src: 'https://kit.fontawesome.com/e0330794a8.js',
                        crossorigin: 'anonymous'
                    },
                    {
                        src: 'https://cdn.tailwindcss.com'
                    }
                ] //script
            } //return
        }, //head()
        data() {
            return{
                theme: '',
                useravatar: '',
                loginbutton: ''
            }//return
        },//data()
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
        },//methods
        async fetch() {
            if(!this.$cookies.get('tema')) {
                this.theme = 'night'
            }else {
                this.theme = this.$cookies.get('tema')
            }//if(){}else{}
            if(process.server) {
                const fs = require('fs')
                const YAML = require('yaml')
                const path = require('path')
                if(!this.$cookies.get('userid')) {
                    this.loginbutton = true
                }else{
                    this.loginbutton = false
                    this.useravatar = YAML.parse(fs.readFileSync(path.join(process.cwd(), `/database/profiles/${this.$cookies.get('userid')}.yaml`), 'utf-8')).useravatar
                }
            }
        }//async fetch()
    }//export default
</script>