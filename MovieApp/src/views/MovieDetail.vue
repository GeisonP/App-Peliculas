<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button href="/">Inicio</ion-button>
        </ion-buttons>
        <ion-title>Detalle</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title class="text-center">{{ movie.title }}</ion-card-title>
          <ion-card-subtitle class="text-center">{{ movie.release_date }}</ion-card-subtitle>
        </ion-card-header>
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="center-img" />
      </ion-card>
      <div class="segment-buttons">
        <ion-button @click="changeSection('overview')" :color="currentSection === 'overview' ? 'primary' : 'light'">Resumen</ion-button>
        <ion-button @click="changeSection('genres')" :color="currentSection === 'genres' ? 'primary' : 'light'">Géneros</ion-button>
        <ion-button @click="changeSection('production')" :color="currentSection === 'production' ? 'primary' : 'light'">Productora</ion-button>
        <ion-button @click="changeSection('trailer')" :color="currentSection === 'trailer' ? 'primary' : 'light'">Trailer</ion-button>
      </div>
      <div class="scrollable-content">
        <div v-if="currentSection === 'overview'" class="segment-content">
          <p>{{ movie.overview }}</p>
        </div>
        <div v-if="currentSection === 'genres'" class="segment-content">
          <ul>
            <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
          </ul>
        </div>
        <div v-if="currentSection === 'production'" class="segment-content">
          <p>País: {{ movie.production_countries.map(c => c.name).join(', ') }}</p>
          <p>Empresas: {{ movie.production_companies.map(c => c.name).join(', ') }}</p>
        </div>
        <div v-if="currentSection === 'trailer'" class="segment-content">
          <div v-if="trailerKey" class="trailer-container">
            <iframe width="100%" height="100%" :src="trailerUrl" frameborder="0" allowfullscreen></iframe>
          </div>
          <p v-else>No hay trailer disponible.</p>
        </div>
      </div>
      <ion-modal :is-open="isTrailerModalOpen" @ionModalDidDismiss="closeTrailerModal">
        <ion-content>
          <div class="trailer-modal-content">
            <iframe width="100%" height="100%" :src="trailerUrl" frameborder="0" allowfullscreen></iframe>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>


  
<script>
import api from '@/services/api';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton } from '@ionic/vue';

export default {
  components: {
    IonHeader, IonToolbar, IonButtons, IonTitle, IonButton
  },
  data() {
    return {
      movie: {},
      currentSection: 'overview',
      trailerKey: null,
      isTrailerModalOpen: false
    };
  },
  async created() {
    const movieId = this.$route.params.movieId;
    await this.fetchMovieDetails(movieId);
  },
  methods: {
    async fetchMovieDetails(movieId) {
      try {
        const response = await api.get(`/movie/${movieId}`);
        this.movie = response.data;
        this.trailerKey = await this.fetchMovieTrailer(movieId);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMovieTrailer(movieId) {
      try {
        const response = await api.get(`/movie/${movieId}/videos`);
        const trailers = response.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
        return trailers.length > 0 ? trailers[0].key : null;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    changeSection(section) {
      this.currentSection = section;
    },
    showTrailerModal() {
      this.isTrailerModalOpen = true;
    },
    closeTrailerModal() {
      this.isTrailerModalOpen = false;
    },
    goHome() {
      this.$router.push({ name: 'Home' });
    }
  },
  computed: {
    trailerUrl() {
      return this.trailerKey ? `https://www.youtube.com/embed/${this.trailerKey}` : '';
    }
  }
};
</script>
  
<style scoped>
.text-center {
  text-align: center;
}
.center-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 300px; /* Ajuste para pantallas pequeñas */
  height: auto;
}
.segment-buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap; 
}
.segment-buttons ion-button {
  margin: 5px; 
}
.scrollable-content {
  max-height: calc(100vh - 400px); 
  overflow-y: auto; 
}
.segment-content {
  text-align: center;
  margin: 20px;
}
.trailer-container {
  width: 100px; 
  height: 100px; 
  margin: 0 auto;
}
.trailer-modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
}
</style>


  