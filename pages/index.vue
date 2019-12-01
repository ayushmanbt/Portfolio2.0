<template>
  <div>
    <div class="my-pic">
      <img src="../images/me.jpeg" alt />
    </div>
    <div class="about me">
      <h1 class="heading">ABOUT ME</h1>
      <p>
        Hello, I'm Ayushman, a fullstack web developer. My catchline is
        <i>"Webbing my life with HTML CSS JS and Python"</i>
      </p>
      <p>
        <span>
          <saber-link to="https://expressjs.com">Express.js</saber-link>
        </span>
        and
        <span>
          <saber-link to="https://vuejs.org">Vue.js</saber-link>
        </span> (BTW this site is made wih
        <span>
          <saber-link to="https://saber.land">Saber.js</saber-link>
        </span> a vue.js framework) are my favourite frameworks.
      </p>
      <p class="top-bar">Discover and contact me using these links</p>
      <div class="top-bar">
        <socialLinks class="socialLinks" />

        <saber-link to="/projects" class="buttoned-link yellow-bg">My Projects</saber-link>
        <saber-link to="/blog" class="buttoned-link outlined">Blog</saber-link>

        <downloadResume />
      </div>
    </div>

    <h1 class="heading">MY SKILLS</h1>

    <h1 class="heading">HOBBIES</h1>
  </div>
</template>

<script>
import socialLinks from "../components/socialLinks.vue";
import downloadResume from "../components/downloadResume.vue";

export const data = {
  layout: "default",
  title: ""
};

export default {
  components: {
    socialLinks,
    downloadResume
  }
};
</script>

<style scoped>
.top-bar {
  display: none;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 20px;
  grid-gap: 10px;
}

.my-pic {
  display: none;
}

@media only screen and (max-width: 750px) {
  .top-bar {
    display: flex;
  }
  .my-pic {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-pic img {
    display: block;
    border-radius: 200px;
    width: 100px;
  }
}
</style>
