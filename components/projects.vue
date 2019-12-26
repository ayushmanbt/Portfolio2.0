<template>
  <div>
    <h1 class="heading">PROJECTS 👨‍🏭</h1>
    <div class="section">
      <h2 class="heading">INTERNSHIPS 🤝</h2>
      <div class="cards-container">
        <projectCard v-for="itsp in internships" :key="itsp.title" :data="itsp" />
      </div>
    </div>
    <div class="section">
      <h2 class="heading">PERSONAL PROJECTS 💝</h2>
      <div class="cards-container">
        <projectCard v-for="itsp in personalProjects" :key="itsp.title" :data="itsp" />
      </div>
    </div>
    <div class="section">
      <h2 class="heading">OTHER PROECTS 🌈</h2>
      <div class="cards-container">
        <projectCard v-for="itsp in honorableMention" :key="itsp.title" :data="itsp" />
      </div>
    </div>
  </div>
</template>

<script>
import projectCard from "../components/projectCard";
import internships from "../images/internships.json";
import personalProjects from "../images/personalProjects.json";
import honorableMention from "../images/honorableMention.json";

// export const data = {
//   layout: "default",
//   title: "Projects"
// };

export default {
  components: {
    projectCard
  },
  data() {
    return {
      internships: internships,
      personalProjects: personalProjects,
      honorableMention: honorableMention
    };
  }
};
</script>

<style scoped>
h2 {
  color: black;
}
.section {
  margin: 10px 20px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
  align-items: stretch;
}

.cards-container > * {
  margin: 10px 10px;
  flex-grow: 1;
  max-width: 500px;
}

.link-to-project {
  margin-top: 20px;
  display: flex;
  width: fit-content;
  margin-left: auto;
  justify-content: right;
  align-items: center;
}

.link-to-project .mdi {
  font-size: 2rem;
  color: #a91b4b;
}

.icon {
  transform: translateX(0px);
  transition: all 0.3s ease-in-out;
  animation: left_right ease-in-out 0.3s alternate;
  -moz-animation: left_right ease-in-out 0.3s alternate;
}

@media only screen and (max-width: 750px) {
  .cards-container {
    justify-content: center;
  }
}
</style>
