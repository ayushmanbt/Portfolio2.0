<template>
  <div>
    <h1>BLOGS</h1>

    <div class="recent-posts" v-if="page.posts">
      <ul>
        <li v-for="post in page.posts" :key="post.permalink">
          <h2>
            {{ formatDate(post.date) }} -
            <a :href="post.permalink">{{ post.title }}</a>
          </h2>
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
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
  }
};
</script>
