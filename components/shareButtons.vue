<template>
  <!-- AddToAny BEGIN -->
  <div>
    <h5>Share This Post:</h5>
    <div v-if="navigator.share" class="flexed">
      <button v-on:click="shareAPI()" class="button">
        Share
        <span class="mdi mdi-share"></span>
      </button>
      <saber-link to="https://mailchi.mp/6b91c94b714d/subs_abt_blog" class="button">SUBSCRIBE</saber-link>
    </div>
    <div v-else class="flexed">
      <a :href="convertedURIFB()" aria-label="share via facebook">
        <span class="mdi mdi-facebook"></span>
      </a>
      <a :href="convertedURIWapp()" aria-label="share via whatsapp">
        <span class="mdi mdi-whatsapp"></span>
      </a>
      <a :href="convertedURITwitter()" aria-label="share via twitter">
        <span class="mdi mdi-twitter"></span>
      </a>
      <saber-link to="https://mailchi.mp/6b91c94b714d/subs_abt_blog" class="button">SUBSCRIBE</saber-link>
    </div>
  </div>
  <!-- AddToAny END -->
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {
      location: "",
      shareText: "",
      navigator: "",
      title: ""
    };
  },
  mounted() {
    this.title = document.title;
    this.navigator = window.navigator;
    this.location = encodeURIComponent(window.location.href);
    this.shareText = encodeURIComponent(
      "Check this awesome post by Ayushman about " + document.title + " at "
    );
  },
  methods: {
    convertedURIFB() {
      return `http://www.facebook.com/sharer.php?u=${this.location}`;
    },
    convertedURIWapp() {
      return `https://api.whatsapp.com/send?text=${this.page.desc +
        this.location}`;
    },
    convertedURITwitter() {
      return `https://twitter.com/share?url=${this.location}&amp;text=${this.page.desc}`;
    },
    shareAPI() {
      navigator
        .share({
          title: this.title,
          url: `${decodeURIComponent(this.location)}`,
          text: `${this.page.desc}... Read more at `
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    }
  }
};
</script>

<style scoped>
.mdi {
  font-size: 2rem;
}
.flexed {
  display: flex;
  align-items: center;
}

.flexed > * {
  display: block;
  margin: 10px 5px;
}

button,
.button {
  background: transparent;
  cursor: pointer;
  color: #375199;
  border: 2px solid #375199;
  padding: 10px 20px;
  display: block;
  outline: none;
  transition: all 0.3s ease-in-out;
  border-radius: 20px;
}

.button:hover,
button:hover {
  background: #375199;
  color: white;
}

.dark-mode button,
.dark-mode .button {
  color: #ff7c15;
  border: 2px solid #ff7c15;
}

.dark-mode .button:hover {
  background: #ff7c15;
  color: black;
}
</style>
