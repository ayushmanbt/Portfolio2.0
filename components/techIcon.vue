<template>
  <div id="individual-tech">
    <span class="mdi" :class="icon"></span>
    <p class="tech-name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: ["name", "icon"]
};
</script>

<style scoped>
.dark-mode #individual-tech:active .mdi,
.dark-mode #individual-tech:hover .mdi,
.dark-mode#individual-tech:focus .mdi {
  color: #c25700;
}

#individual-tech {
  display: flex;
  align-items: center;
  grid-gap: 5px;
}

.tech-name {
  animation: appear 0.3s ease-in-out alternate;
  display: none;
}

#individual-tech:active,
#individual-tech:hover,
#individual-tech:focus {
  cursor: pointer;
}

#individual-tech:active .mdi,
#individual-tech:hover .mdi,
#individual-tech:focus .mdi {
  transform: scale(1.2);
  color: #085ba8;
}

#individual-tech:active .tech-name,
#individual-tech:hover .tech-name,
#individual-tech:focus .tech-name {
  display: block;
  animation: appear 0.25s ease-in-out;
}

@keyframes appear {
  0% {
    display: none;
    transform-origin: left;
    transform: scaleX(0);
  }
  100% {
    display: block;
    transform-origin: left;
    transform: scaleX(1);
  }
}

.mdi {
  font-size: 2rem;
  transition: all 0.3s ease-in-out;
}

@media only screen and (max-width: 900px) and (min-width: 750px) {
  .tech-name {
    font-size: 0.7rem;
  }
  .mdi {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 750px) {
  .mdi {
    font-size: 2rem;
  }
}

@media only screen and (max-width: 400px) {
  .mdi {
    font-size: 1.5rem;
  }
}
</style>
