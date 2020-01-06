<template>
  <div class="container">
    <div class="topbar">
      <saber-link to="/" v-if="route == '/blog'">Portfolio</saber-link>
      <saber-link to="/blog" v-else>Blogs</saber-link>
    </div>
    <div class="dark-mode-button" v-on:click="toggleDarkMode()">
      <techIcon name="Toggle Dark Mode" :icon="dark_mode_icon" />
    </div>
    <div class="open-button" v-on:click="open()">
      <span class="mdi mdi-arrow-right-box"></span>
    </div>
    <div id="left-bar">
      <leftSidebar />
      <div class="cross-button" v-on:click="close()">
        <span class="mdi mdi-close-box"></span>
      </div>
    </div>

    <div class="main-content-container">
      <div
        class="main-content"
        :class="
          route.indexOf('/posts') != -1 || route.indexOf('/blog') != -1
            ? 'width-restricted'
            : ''
        "
      >
        <saber-link
          to="/blog"
          v-if="route.indexOf('/posts') != -1"
          class="back-to-blog"
        >🔙 Back To Blog List</saber-link>

        <div style="height: 20px;" v-if="route.indexOf('/posts') != -1"></div>
        <div class="blogPost" v-if="route.indexOf('/posts') != -1">
          <h1>{{ page.title }}</h1>
          <div style="width: 100%; display: flex">
            <img :src="page.main_img" class="thumbnail" />
          </div>
          <slot name="default" style="margin-top: 10px;" />
        </div>
        <slot name="default" style="margin-top: 10px;" v-else />
        <div style="height: 10px;" v-if="route.indexOf('/posts') != -1"></div>
        <shareButtons :page="page" v-if="route.indexOf('/posts') != -1" />
        <div style="height: 20px;" v-if="route.indexOf('/posts') != -1"></div>
        <h3 v-if="route.indexOf('/posts') != -1">Comments:</h3>
        <div style="height: 5px;" v-if="route.indexOf('/posts') != -1"></div>
        <div id="disqus_thread" v-if="route.indexOf('/posts') != -1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import leftSidebar from "../components/leftSidebar.vue";
import socialLinks from "../components/socialLinks.vue";
import downloadResume from "../components/downloadResume.vue";
import techIcon from "../components/techIcon";
import shareButtons from "../components/shareButtons";

import "@mdi/font/css/materialdesignicons.css";

export default {
  props: ["page"],
  components: {
    leftSidebar,
    socialLinks,
    techIcon,
    shareButtons
  },
  data() {
    return {
      dark_mode_icon: "mdi-moon-waning-crescent",
      dark_mode_light_icon: "mdi-moon-waning-crescent",
      dark_mode_dark_icon: "mdi-weather-sunny",
      route: this.$route.fullPath
    };
  },
  methods: {
    toggleDarkMode: function() {
      // console.log("🙄");
      let toggle = document.getElementsByClassName("dark-mode-button")[0];
      if (this.dark_mode_icon === this.dark_mode_light_icon) {
        this.dark_mode_icon = this.dark_mode_dark_icon;
      } else {
        this.dark_mode_icon = this.dark_mode_light_icon;
      }

      document.body.classList.toggle("dark-mode");
    },

    close: function() {
      let nav = document.getElementById("left-bar");
      let right_arrow = document.getElementsByClassName("open-button")[0];
      nav.style.transform = "scaleX(0)";
      // nav.style.left = "-100vw";
      window.setTimeout(() => {
        nav.style.display = "none";
        right_arrow.style.display = "block";
      }, 320);
    },
    open: function() {
      let nav = document.getElementById("left-bar");
      let right_arrow = document.getElementsByClassName("open-button")[0];
      nav.style.display = "block";
      right_arrow.style.display = "none";
      // nav.style.left = "0vw";
      window.setTimeout(() => {
        nav.style.transform = "scaleX(1)";
      }, 100);
    },
    onResize: function() {
      let nav = document.getElementById("left-bar");

      if (window.innerWidth > 750 && nav.style.display == "none") {
        this.open();
      }
    }
  },
  mounted() {
    //google analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "UA-142130562-2");
    //subscribe
    if (this.route.indexOf("/posts") != -1)
      window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
        L.start({
          baseUrl: "mc.us4.list-manage.com",
          uuid: "a35919cebae144d9cf644ff4b",
          lid: "af22b73e0a",
          uniqueMethods: true
        });
      });

    // console.log(this.$route.fullPath);
    if (!document.body.classList.contains("dark-mode"))
      document.body.classList.add("dark-mode");

    let nav = document.getElementById("left-bar");

    window.addEventListener("resize", this.onResize);
    if (window.innerWidth <= 750)
      window.setTimeout(() => {
        this.close();
      }, 200);

    if (this.route.indexOf("/posts") != -1) {
      var disqus_config = function() {
        this.page.url = "https://www.ayushmanbthakur.com"; // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = this.route; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      (function() {
        // DON'T EDIT BELOW THIS LINE
        var d = document,
          s = d.createElement("script");
        s.src = "https://ayushmanbthakur-com.disqus.com/embed.js";
        s.setAttribute("data-timestamp", +new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },

  head() {
    const pageDesc =
      this.page.desc ||
      "This is the portfolio of Ayushman Bilas Thakur, a FullStack web developer and a part time blogger";
    const pageTitle = this.page && this.page.title;
    const image =
      "https://www.ayushmanbthakur.com/" + (this.page.main_img || "me.jpeg");
    let keywords =
      "Ayushman, Ayushman Bilas Thakur, Web Development Blog, Blog, Web Developer";

    keywords = this.page.tags ? this.page.tags + ", " + keywords : keywords;

    return {
      title: pageTitle
        ? `${pageTitle} - ${this.$siteConfig.title}`
        : this.$siteConfig.title,
      link: [
        {
          rel: "icon",
          href: "/favicon.ico"
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,800|Montserrat:400,800&display=swap",
          defer: true
        }
      ],
      meta: [
        {
          name: "google-site-verification",
          content: "kE8nEcx0W5-VKO-xPHS1RN5iZFv796r1KsoewnJll1g"
        },
        {
          name: "robots",
          content: "all"
        },
        {
          name: "keywords",
          content: keywords
        },
        {
          name: "description",
          content: pageDesc
        },
        {
          property: "og:title",
          content: pageTitle
            ? `${pageTitle} - ${this.$siteConfig.title}`
            : this.$siteConfig.title
        },
        {
          property: "og:type",
          content: "blog"
        },
        {
          property: "og:description",
          content: pageDesc
        },
        {
          property: "og:image",
          content: image
        },
        {
          property: "twitter:creator",
          content: "@AyushmanBThakur"
        },
        {
          property: "twitter:image",
          content: image
        },
        {
          property: "twitter:site",
          content: "@AyushmanBThakur"
        },
        {
          property: "twitter:card",
          content: "summary_large_image"
        }
      ]
    };
  }
};
</script>

<style>
/* 
html {
  filter: invert(100%) hue-rotate(-180deg);
} */

body {
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

.dark-mode .mdi-arrow-right-box {
  color: greenyellow;
}

.dark-mode .mdi-arrow-right-box:hover {
  color: #a1d159;
}

.dark-mode .main-content-container {
  background-color: #000;
  color: white;
}

.dark-mode .heading {
  color: #f0710a;
}

.dark-mode .dark-mode-button:hover {
  color: #d1640a;
}

.dark-mode a {
  color: #f06e32;
}

.dark-mode a:hover {
  color: #ff8c2e;
}

.dark-mode .dark-mode-button {
  color: white;
}

.dark-mode .mdi-unity,
.dark-mode .mdi-cellphone {
  color: white !important;
}

.dark-mode-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
}

.dark-mode .topbar {
  background: #383838;
}

.dark-mode .topbar a {
  color: white;
}

.dark-mode .topbar a:hover,
.dark-mode .topbar a:active,
.dark-mode .topbar a:focus {
  color: coral;
}

.dark-mode .outlined:hover {
  background-color: #e96900;
  color: black;
  outline: none;
}

* {
  margin: 0px;
  padding: 0px;
  font-family: "Montserrat", sans-serif;
}

.topbar {
  height: 40px;
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #c2ff9f;
  display: none;
}

.topbar a:hover,
.topbar a:active,
.topbar a:focus {
  color: darkcyan;
}

.main-content {
  width: 80%;
  margin: 30px auto;
  max-width: 1024px;
}

.main-content-container {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #ffffff;
}

.back-to-blog {
  margin-bottom: 20px !important;
}

a {
  text-decoration: none;
  color: #5475d1;
  transition: all 0.3s ease-in-out;
}

/* a::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #da5a85;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out;
} */

a:hover {
  color: #9c1743;
}

p {
  margin: 6px 0;
}

.container {
  display: flex;
}

#left-bar {
  position: relative;
  height: 100vh;
  min-width: 400px;
  top: 0;
  transform-origin: left;
  transition: all 0.3s ease-in-out;
  overflow-y: none;
  z-index: 2;
}

.cross-button {
  position: absolute;
  top: 0;
  right: 20px;
  display: none;
}

.open-button {
  position: fixed;
  z-index: 2;
  top: -10px;
  left: -10px;
  display: none;
}

.mdi-arrow-right-box {
  color: green;
  font-size: 3rem;
  transition: all 0.2s ease-in-out;
}

.mdi-arrow-right-box:hover {
  color: #025302;
  cursor: pointer;
}

.mdi-close-box {
  color: red;
  font-size: 3rem;
}

.mdi-close-box:hover {
  color: #aa0000;
  cursor: pointer;
}

.heading {
  font-family: "Montserrat Alternates", sans-serif;
  color: #a91b4b;
  margin: 10px 0;
}

.buttoned-link {
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
  border-radius: 30px;
}

.outlined {
  border: 2px solid #a94f1b;
  color: #a91b4b;
  transition: all 0.3s ease-in-out;
}

.outlined:hover {
  background: #a91b4b;
  color: white;
}

.yellow-bg {
  background: #fff49f;
  color: black;
}

.yellow-bg:hover {
  background: #776808;
  color: white;
}

.thumbnail {
  width: 100%;
  height: auto;
  /* max-width: 540px; */
  margin: 10px auto;
}

.width-restricted {
  max-width: 650px;
}

.blogPost h1,
.blogPost h2,
.blogPost h3,
.blogPost h4,
.blogPost h5,
.blogPost h6 {
  font-family: "Montserrat Alternates", sans-serif;
}

.blogPost pre {
  background: #111 !important;
  z-index: 0;
}

code[class*="language-"],
pre[class*="language-"] {
  color: white !important;
  font-family: "Montserrat", sans-serif !important;
}

pre * {
  background: transparent !important;
  text-shadow: none !important;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #990 !important;
}

.dark-mode .blogPost p,
.dark-mode .blogPost li {
  color: #bbb;
}

.blogPost img {
  width: 100%;
}

.blogPost p,
.blogPost li {
  color: #222;
  font-size: 1.1rem;
  margin: 5px 0;
}
.blogPost li {
  margin-left: 20px;
}

@media only screen and (max-width: 900px) and (min-width: 750px) {
  #left-bar {
    min-width: 300px;
    width: 300px;
    font-size: 75%;
  }
}

@media only screen and (min-width: 750px) {
  #left-bar {
    left: 0;
  }
}

@media only screen and (max-width: 750px) {
  .main-content {
    width: 90%;
    margin-top: 50px;
  }

  .topbar {
    padding-right: 10px;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .topbar a {
    color: black;
    font-size: 1.2rem;
    margin-left: auto;
  }

  .mdi {
    font-size: 3rem;
  }

  .container {
    position: relative;
    flex-direction: column;
  }

  .cross-button {
    display: block;
  }
  .dark-mode-button {
    position: absolute;
    top: 2px;
    left: 32px;
    z-index: 2;
  }
  #left-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-width: 0;
  }
}

@media only screen and (max-width: 514px) {
  html {
    font-size: 85%;
  }
  .topbar {
    height: 32px;
  }
  .main-content {
    width: 90%;
  }

  .top-bar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mdi {
    font-size: 3.2rem;
  }
}

/* @media (prefers-color-scheme: dark) {
  body {
    filter: invert(100%) hue-rotate(-180deg);
  }
  img {
    filter: invert(100%) hue-rotate(-180deg);
  }
} */
</style>
