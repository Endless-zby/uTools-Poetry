import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/Movie'
import Poetry from '@/components/Poetry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/poetry',
      name: 'Poetry',
      component: Poetry
    }
  ]
})
