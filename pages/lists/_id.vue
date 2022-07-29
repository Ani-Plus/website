<template>
<h1>
    {{ test }} - {{ t }}
</h1>
</template>
<script>
export default {
    head() {
        return{
            title: "test"
        }
    },
    data() {
        return{
            test: "TEST ÇALIŞIYOR.",
            t: this.$route.params.id
        }
    }
}
</script>