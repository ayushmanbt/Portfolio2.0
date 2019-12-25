<template>
  <!-- AddToAny BEGIN -->
  <div>
    <div v-if="navigator.share">
      <button v-on:click="shareAPI()">Share</button>
    </div>
    <div v-else>
      <h5>Share This Post:</h5>
      <a :href="convertedURIFB()">
        <span class="mdi mdi-facebook"></span>
      </a>
      <a :href="convertedURIWapp()">
        <span class="mdi mdi-whatsapp"></span>
      </a>
      <a :href="convertedURITwitter()">
        <span class="mdi mdi-twitter"></span>
      </a>
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
    console.log(this.shareText);
  },
  methods: {
    convertedURIFB() {
      return `http://www.facebook.com/sharer.php?u=${this.location}`;
    },
    convertedURIWapp() {
      return `https://api.whatsapp.com/send?text=${this.shareText +
        this.location}`;
    },
    convertedURITwitter() {
      return `https://twitter.com/share?url=${this.location}&amp;text=${this.shareText}`;
    },
    shareAPI() {
      navigator
        .share({
          title: this.title,
          url: `${decodeURIComponent(this.location)}`
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
</style>
