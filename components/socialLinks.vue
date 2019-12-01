<template>
  <div class="social-links">
    <saber-link to="https://github.com/AyushmanBilasThakur">
      <span class="mdi mdi-github-circle"></span>
    </saber-link>

    <saber-link to="https://www.linkedin.com/in/ayushman-bilas-thakur-13162a16b/">
      <span class="mdi mdi-linkedin"></span>
    </saber-link>

    <saber-link to="https://twitter.com/AyushmanBThakur">
      <span class="mdi mdi-twitter"></span>
    </saber-link>

    <saber-link to="mailto:ayushmanbilasthakur@gmail.com">
      <span class="mdi mdi-email"></span>
    </saber-link>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  width: fit-content;
  justify-content: center;
}
.social-links a {
  padding: 0 10px;
  text-decoration: none;
}

a::before {
  display: none;
}

a:visited {
  color: initial;
}
.mdi {
  font-size: 30px;
}
.mdi:hover {
  color: #ae2135;
  cursor: pointer;
}

.mdi-email,
.mdi-github {
  color: black;
}

.mdi-linkedin,
.mdi-twitter {
  color: cornflowerblue;
}
</style>
