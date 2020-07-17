module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "starter",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        href: "/js/charting_library/base.css"
      },
      {
        href: "/js/charting_library/base2.css"
      }
    ],
    script: [
      {
        src: "/js/jquery-3.2.1.min.js"
      },
      {
        src: "/js/charting_library/charting_library.min.js"
      },
      {
        src: "/js/iconfont.js"
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ["~assets/css/main.css"],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#3B8070"
  },
  /*
   ** Build configuration
   */
  plugins: [
    "~plugins/i18n.js",
    "~plugins/st-ui.js",
    "~plugins/api.js",
    "~plugins/filter.js",
    {
      src: "~plugins/google.js",
      ssr: false
    },
    {
      src: "~plugins/intercom.js",
      ssr: false
    },
    "~plugins/echarts",
    "~plugins/qrcode.js"
  ],
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true
  },
  proxy: {
    "/api": {
      target: "http://swap.hiup.pro/fe-cov2-api",
      pathRewrite: {
        "^/api": "/"
      }
    }
  },
  build: {
    /*
     ** Run ESLINT on save
     */
    // extend(config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: "pre",
    //       test: /\.(js|vue)$/,
    //       loader: "eslint-loader",
    //       exclude: /(node_modules)/
    //     });
    //   }
    // }
  }
};
