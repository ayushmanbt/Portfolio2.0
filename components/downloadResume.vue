<template>
  <a class="download-resume" href="/Ayushman Bilas Thakur.pdf" download>Download Resume</a>
</template>

<style scoped>
.dark-mode .download-resume {
  background: #c25700;
}

.dark-mode .download-resume:hover {
  background: #e96900;
  color: #142000;
}

.download-resume {
  padding: 10px 30px;
  background: #a91b4b;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  border-radius: 40px;
  text-align: center;
}

.download-resume::before {
  display: none;
}

.download-resume:hover {
  background: #5f0926;
  color: white;
}
</style>
