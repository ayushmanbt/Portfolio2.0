
    export default [
      {
          path: "/posts/hello-world",
          meta: {
            __relative: '_posts/firstPost.md',
            __pageId: '1dd214e2'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--_posts-firstPost-md" */ "/run/media/ayushman/01D594B18F4B0BC0/Users/ayush/Desktop/Portfolio 2.0/pages/_posts/firstPost.md?saberPage=1dd214e2")
            
          }
        },
{
          path: "/blog",
          meta: {
            __relative: 'blog.vue',
            __pageId: 'ec872070'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--blog-vue" */ "/run/media/ayushman/01D594B18F4B0BC0/Users/ayush/Desktop/Portfolio 2.0/pages/blog.vue?saberPage=ec872070")
            
          }
        },
{
          path: "/",
          meta: {
            __relative: 'index.vue',
            __pageId: '4616c59c'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--index-vue" */ "/run/media/ayushman/01D594B18F4B0BC0/Users/ayush/Desktop/Portfolio 2.0/pages/index.vue?saberPage=4616c59c")
            
          }
        },
{
          path: "/projects",
          meta: {
            __relative: 'projects.vue',
            __pageId: '7c4135a0'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--projects-vue" */ "/run/media/ayushman/01D594B18F4B0BC0/Users/ayush/Desktop/Portfolio 2.0/pages/projects.vue?saberPage=7c4135a0")
            
          }
        },
      
      // An addtional route to catch all other requests, i.e. 404 page
      {
        path: '*',
        name: 404,
        component: function () {
          return import(/* webpackChunkName: "404-page" */ "/run/media/ayushman/01D594B18F4B0BC0/Users/ayush/Desktop/Portfolio 2.0/node_modules/saber/vue-app/404.vue")
        }
      }
    ]