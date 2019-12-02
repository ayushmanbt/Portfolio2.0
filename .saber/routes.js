
    export default [
      {
          path: "/posts/hello-world",
          meta: {
            __relative: '_posts/firstPost.md',
            __pageId: '55a7de78'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--_posts-firstPost-md" */ "C:/Users/ayush/Desktop/Portfolio 2.0/pages/_posts/firstPost.md?saberPage=55a7de78")
            
          }
        },
{
          path: "/blog",
          meta: {
            __relative: 'blog.vue',
            __pageId: 'c6367b02'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--blog-vue" */ "C:/Users/ayush/Desktop/Portfolio 2.0/pages/blog.vue?saberPage=c6367b02")
            
          }
        },
{
          path: "/",
          meta: {
            __relative: 'index.vue',
            __pageId: 'd00e6c76'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--index-vue" */ "C:/Users/ayush/Desktop/Portfolio 2.0/pages/index.vue?saberPage=d00e6c76")
            
          }
        },
{
          path: "/projects",
          meta: {
            __relative: 'projects.vue',
            __pageId: '490354d7'
          },
          component: function() {
            
            return import(/* webpackChunkName: "page--projects-vue" */ "C:/Users/ayush/Desktop/Portfolio 2.0/pages/projects.vue?saberPage=490354d7")
            
          }
        },
      
      // An addtional route to catch all other requests, i.e. 404 page
      {
        path: '*',
        name: 404,
        component: function () {
          return import(/* webpackChunkName: "404-page" */ "C:/Users/ayush/Desktop/Portfolio 2.0/node_modules/saber/vue-app/404.vue")
        }
      }
    ]