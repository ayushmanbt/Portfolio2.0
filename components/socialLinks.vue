<template>
  <div class="social-links">
    <saber-link to="https://github.com/AyushmanBilasThakur" aria-label="Ayushman's Github Profile">
      <span class="mdi mdi-github-circle"></span>
    </saber-link>

    <saber-link to="https://www.linkedin.com/in/ayushman-bilas-thakur-13162a16b/" aria-label="Ayushman's Linkein Profile">
      <span class="mdi mdi-linkedin"></span>
    </saber-link>

    <saber-link to="https://twitter.com/AyushmanBThakur" aria-label="Ayushman's Twitter Profile">
      <span class="mdi mdi-twitter"></span>
    </saber-link>

    <saber-link to="mailto:ayushmanbilasthakur@gmail.com" aria-label="Ayushman's Email">
      <span class="mdi mdi-email"></span>
    </saber-link>

    <saber-link to="https://dev.to/ayushmanbthakur" aria-label="Ayushman's dev.to profile">
      <span class="mdi mdi-dev-to"></span>
    </saber-link>

    <saber-link to="feeds://ayushmanbthakur.com/rss2.xml" aria-label="RSS2 for Ayushman's Blog">
      <span class="mdi mdi-rss"></span>
    </saber-link>
  </div>
</template>

<style scoped>
.dark-mode .mdi:hover {
  color: #ee7410;
}

.dark-mode .mdi {
  color: silver;
}

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
