import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MoviesList from '@/views/MoviesList.vue';
import MovieDetail from '@/views/MovieDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/genre/:genreId',
    name: 'GenreMovies',
    component: MoviesList
  },
  {
    path: '/top-rated',
    name: 'TopRatedMovies',
    component: MoviesList
  },
  {
    path: '/now-playing',
    name: 'NowPlayingMovies',
    component: MoviesList
  },
  {
    path: '/upcoming',
    name: 'UpcomingMovies',
    component: MoviesList
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
