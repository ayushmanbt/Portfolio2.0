<template>
  <div class="container">
    <div class="dark-mode-button" v-on:click="toggleDarkMode()">
      <techIcon name="Toggle Dark Mode" :icon="dark_mode_icon" />
    </div>

    <div id="left-bar" data-simplebar>
      <leftSidebar />
      <div class="cross-button" v-on:click="close()">
        <span class="mdi mdi-close-box"></span>
      </div>
    </div>

    <div class="main-content-container" data-simplebar>
      <div class="open-button" v-on:click="open()">
        <span class="mdi mdi-arrow-right-box"></span>
      </div>
      <div class="main-content">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script>
import leftSidebar from "../components/leftSidebar.vue";
import socialLinks from "../components/socialLinks.vue";
import downloadResume from "../components/downloadResume.vue";
import techIcon from "../components/techIcon";

import "@mdi/font/css/materialdesignicons.css";
import "simplebar";
import "simplebar/dist/simplebar.css";

export default {
  props: ["page"],
  components: {
    leftSidebar,
    socialLinks,
    techIcon
  },
  data() {
    return {
      dark_mode_icon: "mdi-moon-waning-crescent",
      dark_mode_light_icon: "mdi-moon-waning-crescent",
      dark_mode_dark_icon: "mdi-weather-sunny"
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
    let nav = document.getElementById("left-bar");
    window.addEventListener("resize", this.onResize);
    if (window.innerWidth <= 750)
      window.setTimeout(() => {
        this.close();
      }, 200);
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },

  head() {
    const pageTitle = this.page && this.page.title;
    return {
      title: pageTitle
        ? `${pageTitle} - ${this.$siteConfig.title}`
        : this.$siteConfig.title,
      link: [
        {
          rel: "icon",
          href: "/favicon.ico"
        }
      ]
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,800|Montserrat:400,800&display=swap");
/* 
html {
  filter: invert(100%) hue-rotate(-180deg);
} */

.dark-mode {
  filter: invert(100%) hue-rotate(-180deg);
}

.dark-mode img {
  filter: invert(100%) hue-rotate(-180deg);
}

.dark-mode-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
}

::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}

::-webkit-scrollbar-button {
  display: none;
}

* {
  margin: 0px;
  padding: 0px;
  font-family: "Montserrat", sans-serif;
}

.main-content {
  width: 80%;
  margin: 30px auto;
  max-width: 1024px;
}

.main-content-container {
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #f2fbbd;
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
  height: 100vh;
  min-width: 400px;
  top: 0;
  transform-origin: left;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
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
  top: -10px;
  left: -10px;
  display: none;
}

.mdi-arrow-right-box {
  color: green;
  font-size: 3rem;
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
  border: 2px solid #a91b4b;
  color: #a91b4b;
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

@media only screen and (min-width: 750px) {
  #left-bar {
    left: 0;
  }
}

@media only screen and (max-width: 750px) {
  .main-content {
    width: 90%;
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
