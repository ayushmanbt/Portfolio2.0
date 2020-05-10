<template>
  <div class="card">
    <div class="top-img">
      <img src="../images/computer.jpg" loading="lazy" :alt="data.title" />

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
      <p class="dates" v-if="data.date">{{data.date}}</p>
      <p class="details">{{data.description}}</p>
      <div class="links">
        <div v-for="link in data.links" :key="link.link">
          <saber-link
            v-if="link_type !== 'refferal'"
            :to="link.link"
            :aria-label="link.type == 'github' ? 'Github Project Link' : 'Hosted Link For The Project'"
          >
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

  border: 4px solid #a8502d;
  border-radius: 20px;
}

.dark-mode .card {
  border: 4px solid #e68e6b;
  background: #232323;
  color: white;
}

/* .dark-mode .card .top-img {
  background: #fff;
  color: #000;
}
.dark-mode .card .top-img img {
  opacity: 0.3;
}

.dark-mode .card .top-details h2 {
  color: #004100;
} */

.top-img {
  background: #000000;
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

.techs-container > * {
  margin: 0 3px;
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

.dates {
  padding: 5px 15px;
  font-weight: bold;
}

.details {
  padding: 0px 15px;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  margin-bottom: 20px;
}

.links > * {
  margin: 0 5px;
}

@media only screen and (max-width: 900px) and (min-width: 750px) {
  .top-details h2 {
    font-size: 1.2rem;
  }
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
    font-size: 0.9rem;
  }
  .top-details h2 {
    font-size: 1.2rem !important;
  }
}
</style>
