<template>
  <!-- AddToAny BEGIN -->
  <div>
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
  <!-- AddToAny END -->
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {
      location: "",
      shareText: ""
    };
  },
  mounted() {
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
    }
  }
};
</script>

<style scoped>
.mdi {
  font-size: 2rem;
}
</style>>

</style>