<template>
  <div class="wrapper">
    <div class="my-pic">
      <img src="../images/me.jpeg" alt />
    </div>
    <div class="about me">
      <h1 class="heading">ABOUT ME 🧐</h1>
      <p>
        Hello, I'm Ayushman, a Full-Stack web developer. My catch line is
        <i>"Webbing my life with HTML CSS JS and Python"</i>
      </p>
      <p>
        <span>
          <saber-link to="https://expressjs.com">Express.js</saber-link>
        </span>
        and
        <span>
          <saber-link to="https://vuejs.org">Vue.js</saber-link>
        </span> are my favourite frameworks. (By the way this site is made with
        <span>
          <saber-link to="https://saber.land">Saber.js</saber-link>
        </span> a vue.js framework)
      </p>
      <div class="top-bar">
        <socialLinks class="socialLinks" />

        <saber-link to="/blog" class="buttoned-link outlined">Blog</saber-link>

        <downloadResume />
      </div>
    </div>
    <br />
    <h1 class="heading">SKILLS 💪</h1>
    <div class="skill-part">
      <skillBlock heading="WEB DEV ESSENTIALS" :skills="JSON.stringify(skl.slice(0,3))" />
      <skillBlock heading="FRONTEND FRAMEWORKS" :skills="JSON.stringify(skl.slice(3,6))" />
      <skillBlock heading="BACKEND TECHNOLOGIES" :skills="JSON.stringify(skl.slice(6,8))" />
      <skillBlock heading="OTHERS" :skills="JSON.stringify(skl.slice(8,10))" />
    </div>
    <br />
    <h1 class="heading">HOBBIES 🤔</h1>
    <div class="skill-block">
      <skills name="UI/UX Development" mdi="mdi-cellphone" color="#000000" />
      <skills name="Blog Writing" mdi="mdi-typewriter" />
    </div>
    <br />

    <Projects id="#projects" />
    <br />

    <Contact />
  </div>
</template>

<script>
import socialLinks from "../components/socialLinks.vue";
import downloadResume from "../components/downloadResume.vue";
import skills from "../components/skills.vue";
import skillBlock from "../components/skillBlock";
import skillList from "../images/skills.json";
import Projects from "../components/projects";
import Contact from "../components/contact";

export const data = {
  layout: "default",
  title: "Portfolio"
};

export default {
  components: {
    socialLinks,
    downloadResume,
    skills,
    skillBlock,
    Projects,
    Contact
  },
  data() {
    return {
      skl: skillList
    };
  }
};
</script>

<style scoped>
.top-bar {
  display: none;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  grid-gap: 10px;
}

.top-bar > * {
  margin: 5px 15px;
}

.my-pic {
  display: none;
}

.skill-part {
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px 20px;
  justify-content: space-between;
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

.link-to-project:hover .icon {
  transform: translateX(10px);
}

@keyframes left_right {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(10px);
  }
}

@media only screen and (max-width: 750px) {
  .top-bar {
    display: flex;
  }
  .my-pic {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-pic img {
    display: block;
    border-radius: 200px;
    width: 100px;
  }
}
</style>
