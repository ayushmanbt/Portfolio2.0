<template>
  <div>
    <h1 class="heading">PROJECTS</h1>
    <div class="section">
      <h2 class="heading">INTERNSHIPS</h2>
      <div class="cards-container">
        <projectCard v-for="itsp in internships" :key="itsp.title" :data="itsp" />
      </div>
    </div>
    <div class="section">
      <h2 class="heading">PERSONAL PROJECTS</h2>
      <div class="cards-container">
        <projectCard v-for="itsp in personalProjects" :key="itsp.title" :data="itsp" />
      </div>
    </div>
    <div class="section">
      <h2 class="heading">HONORABLE MENTIONS</h2>
    </div>
  </div>
</template>

<script>
import projectCard from "../components/projectCard";
import internships from "../images/internships.json";
import personalProjects from "../images/personalProjects.json";

export const data = {
  layout: "default"
};

export default {
  components: {
    projectCard
  },
  data() {
    return {
      internships: internships,
      personalProjects: personalProjects
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
}

@media only screen and (max-width: 750px) {
  .cards-container {
    justify-content: center;
  }
}
</style>
