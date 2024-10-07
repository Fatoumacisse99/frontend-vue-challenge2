<template>
  <div class="container-fluid p-5 d-flex align-items-center justify-content-center">
    <div class="card text-white text-center p-5 shadow-lg rounded" style="max-width: 600px; backdrop-filter: blur(10px);">
      <h1 class="card-title mb-4">{{ $t('welcome') }}</h1>
      <p class="card-text">{{ $t('discover_text') }}</p>
      <router-link to="/recette-list" class="btn btn-primary btn-lg mt-3 discover-btn">
        <i class="fas fa-utensils me-2"></i> {{ $t('discover') }}
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container-fluid {
  background-image: url('../assets/backgroud.jpg');
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card {
  background-color: rgba(0, 0, 0, 0.7); 
  border: none;
}

.discover-btn {
  transition: transform 0.3s, background-color 0.3s;
}

.discover-btn:hover {
  transform: scale(1.05);
  background-color: #ffc107; /* Change la couleur au survol */
  color: #ffffff;
}

@media (max-width: 576px) {
  .card {
    padding: 3rem 1.5rem;
  }
}
</style>
