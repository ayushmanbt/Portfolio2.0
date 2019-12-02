<template>
  <div class="skill-block">
    <h2>{{ heading }}</h2>
    <div class="skill-list">
      <div v-for="skill in JSON.parse(skills)" :key="skill.name">
        <skills :name="skill.name" :mdi="skill.mdi" :color="skill.color" />
      </div>
    </div>
  </div>
</template>

<script>
import skills from "./skills";
export default {
  props: ["heading", "skills"],
  components: {
    skills
  }
};
</script>

<style scoped>
h2 {
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 1.2rem;
}

.skill-list {
  margin: 10px 5px;
}
</style>