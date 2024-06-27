<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi App de Películas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="!selectedGenre" class="container">
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="genre in genres" :key="genre.id">
              <ion-card @click="selectGenre(genre.id)">
                <ion-card-content>{{ genre.name }}</ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div class="button-group">
          <ion-button @click="fetchNowPlayingMovies">Cartelera</ion-button>
          <ion-button @click="fetchTopRatedMovies">Mejor Calificadas</ion-button>
          <ion-button @click="fetchPopularMovies">Populares</ion-button>
        </div>
      </div>
      <div v-else class="container">
        <ion-button @click="clearGenreSelection">Regresar</ion-button>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="movie in movies" :key="movie.id">
              <ion-card @click="viewMovieDetail(movie.id)">
                <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
                <ion-card-content>
                  <ion-card-title>{{ movie.title }}</ion-card-title>
                  <ion-card-subtitle>{{ movie.release_date }}</ion-card-subtitle>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      genres: [],
      selectedGenre: null,
      movies: []
    };
  },
  created() {
    this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await api.get('/genre/movie/list');
        this.genres = response.data.genres;
      } catch (error) {
        console.error(error);
      }
    },
    async selectGenre(genreId) {
      this.selectedGenre = genreId;
      await this.fetchMoviesByGenre();
    },
    async fetchMoviesByGenre() {
      try {
        const response = await api.get(`/discover/movie`, {
          params: {
            with_genres: this.selectedGenre
          }
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    clearGenreSelection() {
      this.selectedGenre = null;
      this.movies = [];
    },
    async fetchTopRatedMovies() {
      try {
        const response = await api.get('/movie/top_rated');
        this.movies = response.data.results;
        this.selectedGenre = 'TopRated';
      } catch (error) {
        console.error(error);
      }
    },
    async fetchNowPlayingMovies() {
      try {
        const response = await api.get('/movie/now_playing');
        this.movies = response.data.results;
        this.selectedGenre = 'NowPlaying';
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPopularMovies() {
      try {
        const response = await api.get('/movie/popular');
        this.movies = response.data.results;
        this.selectedGenre = 'Popular';
      } catch (error) {
        console.error(error);
      }
    },
    viewMovieDetail(movieId) {
      this.$router.push({ name: 'MovieDetail', params: { movieId: movieId } });
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 16px;
}

.button-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

ion-card {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

ion-card img {
  width: 100%;
  height: auto;
}

ion-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

ion-title {
  text-align: center;
}

ion-button {
  margin-bottom: 20px;
}
</style>
