<!--
-------------------------------------------------
- Ani-Plus Web Sitesinin Ana Sayfasıdır.
- Bu Dosya yalnızca sitenin '/' sayfasını içerir.
-------------------------------------------------
-->
<template>
<h1>
    <a href="/animes/22199">{{ test }}</a>
</h1>
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
let infoQueries = [
    "name"
]
export default {
    auth: 'guest',
    head() {
        return{
            title: "Anasayfa - Ani+"
        }
    },
    data() {
        return{
            test: "Site çalışıyor."
        }
    },
    async fetch() {
        try {
            
        }catch(err) {
            console.log(err)
        }
    }
}
</script>