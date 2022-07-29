<!--
-------------------------------------------------
- Ani-Plus Web Sitesinin Ana Sayfasıdır.
- Bu Dosya yalnızca sitenin '/' sayfasını içerir.
-------------------------------------------------
-->
<template>
<h1>
    <NuxtLink to="/animes/22199">{{ test }}</NuxtLink>
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