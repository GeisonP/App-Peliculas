<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button href="/">Ir al inicio</ion-button>
        </ion-buttons>
        <ion-title>Populares</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="4" v-for="movie in movies" :key="movie.id" :href="`/movie/${movie.id}`">
            <ion-card>
              <ion-img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"></ion-img>
              <ion-card-content>
                <ion-card-title>{{ movie.title }}</ion-card-title>
                <p>{{ movie.release_date }}</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div class="pagination">
        <ion-button v-for="page in totalPages" :key="page" @click="changePage(page)">
          {{ page }}
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import api from '@/services/api';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonGrid, IonButton } from '@ionic/vue';
export default {
  components: {
    IonHeader, IonToolbar, IonButtons, IonTitle, IonGrid, IonButton
  },
  data() {
    return {
      movies: [],
      page: 1,
      totalPages: 10,
      genreId: null,
      loading: false
    };
  },
  async created() {
    this.genreId = this.$route.params.genreId;
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await api.get(`/discover/movie`, {
          params: {
            with_genres: this.genreId,
            page: this.page
          }
        });
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
      } catch (error) {
        console.error(error);
      }
    },
    async changePage(page) {
      this.page = page;
      await this.fetchMovies();
    },
    async viewMovieDetail(movieId) {
        this.$router.push({ name: 'MovieDetail', params: { movieId } });
      }, 
    goHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination ion-button {
  margin: 0 5px;
}

ion-card {
  cursor: pointer;
}

ion-card-title {
  font-size: 1.2em;
  font-weight: bold;
}

ion-card-content p {
  margin: 0;
  color: gray;
}

ion-img {
  width: 100%;
  height: auto;
}
</style>
