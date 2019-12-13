<template>
  <div>
    <h1 class="heading">BLOGS</h1>

    <div class="recent-posts" v-if="page.posts">
      <ul>
        <li v-for="post in page.posts" :key="post.permalink">
          <a :href="post.permalink">
            <div class="read">Read</div>
            <div class="content">
              <h2>{{ post.title }}</h2>
              <p>{{ post.desc || "this post has no description!" }}</p>
              <p class="date">{{ formatDate(post.date) }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export const data = {
  layout: "default",
  injectAllPosts: true,
  title: ""
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
}

li {
  margin: 10px;
  border: 2px solid black;
}

li a {
  display: flex;
}

.read {
  display: flex;
  padding: 0px 0px;

  justify-content: center;
  align-items: center;
  background-color: greenyellow;
  color: black;
  width: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

a:hover .read {
  width: 150px;
}

.content {
  margin: 10px 20px;
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
</style>