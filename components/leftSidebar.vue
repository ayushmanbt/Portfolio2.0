<template>
  <div>
    <nav id="nav">
      <div class="top">
        <img src="../images/me.jpeg" alt />
        <h1>Ayushman Bilas Thakur</h1>
        <p>Fullstack web development</p>
        <p>Part time blogging</p>
        <downloadResume class="downloadResume" />
      </div>

      <div>
        <ul>
          <li>
            <saber-link to="/" v-on:click="close()" active-class="active" exact>ABOUT ME</saber-link>
          </li>

          <li>
            <saber-link to="/projects" v-on:click="close()" active-class="active" exact>PROJECTS</saber-link>
          </li>

          <li>
            <saber-link to="/blog" v-on:click="close()" active-class="active" exact>BLOG</saber-link>
          </li>
        </ul>
      </div>

      <div class="links">
        <socialLinks />
      </div>
    </nav>
  </div>
</template>

<script>
import downloadResume from "./downloadResume.vue";
import socialLinks from "./socialLinks.vue";
export default {
  components: { downloadResume, socialLinks },
  methods: {
    close: function() {
      console.log("HERE");
      this.$emit("close()");
    }
  }
};
</script>

<style scoped>
nav {
  position: relative;
  padding: 0 40px;
  background: #fff49f;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all ease-in-out 0.6s;
}

.downloadResume {
  margin-top: 10px;
}

ul {
  list-style: none;
  text-align: center;
}

li {
  margin: 20px;
}

a {
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  transition: all 0.3s ease;
}

a::before {
  display: none;
}

a:hover {
  color: #a91b4b;
}
.active {
  background-color: #a91b4b;
  border-radius: 30px;
  padding: 10px 20px;
  color: white;
}

.active:hover {
  cursor: default;
  color: white;
}

h1 {
  text-align: center;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: bold;
  color: #a91b4b;
  margin-bottom: 20px;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
}

.top p {
  text-align: center;
  margin: 5px;
}

img {
  width: 150px;
  border-radius: 200px;
  margin-bottom: 20px;
}
.links {
  margin-top: 40px;
}
@media only screen and (max-width: 800px) {
  nav {
    padding: 0;
  }
}
</style>
