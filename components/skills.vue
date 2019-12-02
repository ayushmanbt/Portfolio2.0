<template>
  <div class="single_skill">
    <div class="icon">
      <span class="mdi" :class="mdi" :style="style"></span>
    </div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: ["name", "mdi", "color"],
  computed: {
    style() {
      return "color: " + this.color;
    }
  }
};
</script>

<style scoped>
.single_skill {
  display: flex;
  align-items: center;
}

.mdi {
  font-size: 30px;
  margin-right: 10px;
}
</style>