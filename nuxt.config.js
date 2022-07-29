export default {
    components: false,
    generate: {
        dir: 'dist',
        subFolders: false
    },
    server: {
        host: 'localhost',
        port: 3000
    },
    loading: {
        color: "#ffffff",
        failedColor: "#ED4245",
        height: "3px",
        throttle: 0
    },
    script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
        },
        {
          src: "https://kit.fontawesome.com/e0330794a8.js",
          crossorigin: "anonymous"
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
        },
        {
          rel: 'icon', type: 'image/x-icon', href: 'https://cdn.discordapp.com/attachments/775822548519616562/1002503519716261939/logo.png?size=4096'
       }
      ],
    meta: [
        { 
          charset: 'utf-8' 
        },
        { 
          name: 'viewport', content: 'width=device-width, initial-scale=1' 
        },
        {
          author: 'Ani-Plus',
          name: 'Ani-Plus',
          color: "#FFFFFF",
          content: 'Ani-Plus - Türkçe Anime İzleme Sitesi.'
        }
    ],
    modules: ['@nuxtjs/axios'],
    target: 'static',
    css: ['~/assets/css/main.css'],
    devServerHandlers: []
}