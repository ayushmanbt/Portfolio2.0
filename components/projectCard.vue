<template>
  <div class="card">
    <div class="top-img">
      <img src="../images/computer.jpg" />

      <div class="techs-container">
        <techIcon v-for="tech in data.technologies" :key="tech" :name="tech" :icon="rdi(tech)" />
      </div>

      <div class="top-details">
        <h2>{{ data.title }}</h2>
        <p>{{ data.company_name }}</p>
        <br />
      </div>
    </div>
    <div class="bottom-details">
      <p class="details">{{data.description}}</p>
      <div class="links">
        <div v-for="link in data.links" :key="link.link">
          <saber-link :to="link.link">
            <span class="mdi mdi-github-circle" v-if="link.type === 'github'"></span>
            <span v-else class="mdi mdi-link"></span>
          </saber-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import techIcon from "./techIcon.vue";
import returnDefaultIcon from "../helperFuctions/determineIcon";

export default {
  props: ["data"],
  components: {
    techIcon
  },
  methods: {
    rdi(name) {
      return returnDefaultIcon(name);
    }
  }
};
</script>

<style scoped>
.card {
  width: 356px;
  height: fit-content;
  border: 4px solid #5f0926;
  border-radius: 20px;
}
.top-img {
  background: #000;
  color: #eee;
  position: relative;
  border-radius: 16px 16px 0 0;
}
.top-img img {
  opacity: 0.7;
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 20px 20px 0 0;
}

.techs-container {
  position: absolute;
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;
  top: 5px;
  left: 10px;
}

.mdi {
  font-size: 2rem;
  transition: all 0.3s ease-in-out;
}

.top-details {
  position: absolute;
  bottom: 0;
  left: 20px;
  margin-right: 20px;
}

.top-details h2 {
  color: greenyellow;
  font-family: "Montserrat Alternates", sans-serif;
}

.top-details p {
  font-size: 0.8rem;
}

.details {
  padding: 10px 20px;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  margin-bottom: 20px;
}

@media only screen and (max-width: 750px) {
  .mdi {
    font-size: 2rem;
  }
}

@media only screen and (max-width: 400px) {
  .card {
    width: 95%;
  }
  .top-details p {
    display: none;
  }
  .top-details h2 {
    font-size: 1.2rem !important;
  }
}
</style>
