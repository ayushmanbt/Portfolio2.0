<template>
  <div>
    <h1 class="heading">BLOGS 😎</h1>

    <div class="recent-posts" v-if="page.posts">
      <ul>
        <li v-for="post in page.posts" :key="post.permalink">
          <a :href="post.permalink">
            <div class="read">Read📖</div>
            <div class="content">
              <div v-if="post.main_img" class="thumbnail_container">
                <img :src="post.main_img" alt class="thumbnail_on_card" />
              </div>
              <div class="blob">
                <h2>{{ post.title }}</h2>
                <p>{{ post.desc || "this post has no description!" }}</p>
                <p class="date">{{ formatDate(post.date) }}</p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div v-else>
      <img class="spc" src="../images/uc.png" alt />
    </div>
  </div>
</template>

<script>
export const data = {
  layout: "default",
  injectAllPosts: true,
  title: "Blog"
};

export default {
  props: ["page"],
  methods: {
    formatDate(v) {
      const date = new Date(v);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 10px;
}

ul {
  margin: 0 20px;
}

ul li {
  list-style: none;
  margin-bottom: 10px;
  width: 100%;
}

.dark-mode li {
  border: 2px solid #ccc;
}

.dark-mode .read {
  background-color: #f0710a;
}

.dark-mode li a p {
  color: #fff;
}

.dark-mode li a .date {
  color: #bbb;
}

.dark-mode li a h2 {
  color: #f0710a;
}

.blob {
  margin: 10px 20px;
}

li {
  margin: 10px;
  border: 2px solid black;
}

li a {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.read {
  position: absolute;
  display: flex;
  padding: 10px 20px;

  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #c2ff9f;
  color: black;
  width: fit-content;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

img {
  width: 100%;
  display: block;
}

a:hover > .read {
  background-color: #5e9905;
  color: white;
}

li a h2 {
  color: #aa3322;
}

li a p {
  color: #333;
}

.date {
  color: #aaa;
}

.thumbnail_container {
  width: 100%;
  margin-bottom: 10px;
}

.thumbnail_on_card {
  display: block;
  width: 100%;
  margin: 0 auto;
}

@media screen and (max-width: 750px) {
  li a {
    flex-direction: column-reverse;
  }

  .read {
    position: relative;
    width: 100%;
    padding: 5px;
    transition: all 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  a:hover .read {
    width: 100%;
  }

  img {
    width: 80%;
  }

  a:active .read,
  a:hover .read {
    background-color: #5e9905;
    color: white;
  }
}
</style>
