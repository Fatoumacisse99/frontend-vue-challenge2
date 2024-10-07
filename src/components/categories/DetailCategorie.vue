<template>
  <div class="container mt-5">
    <h2 class="text-center">{{ $t('category details') }}</h2>

    <div v-if="categorie" class="d-flex justify-content-center">
      <!-- Utilisation d'une carte Bootstrap pour un design plus propre -->
      <div class="card w-50 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">{{ $t('category_name') }}: {{ categorie.name }}</h5>
          <p class="card-text">{{ $t('category_description') }}: {{ categorie.description || $t('no_description') }}</p>

          <!-- Lien vers la liste des recettes liées à cette catégorie -->
          <router-link 
            :to="{ name: 'recettes-by-category', params: { categoryId: categorie.id } }" 
            class="btn btn-primary me-2">
            {{ $t('view_recipes') }}
          </router-link>
          <router-link to="/categories" class="btn btn-secondary">
            {{ $t('back_to_list') }}
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <p class="text-danger">{{ $t('category not_found') }}</p>
      <router-link to="/categories" class="btn btn-secondary">
        {{ $t('back_to_list') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/store/categoryStore';

const route = useRoute();
const store = useCategoryStore();
const categorie = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id); // Assurez-vous que l'ID est bien un entier
  categorie.value = store.getCategoryById(id); // Utilise le nom correct de la méthode
});
</script>

<!-- Style CSS personnalisé -->
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
h2 {
  margin-bottom: 20px;
}
.card {
  background-color: #f8f9fa; /* Couleur de fond douce */
  border-radius: 10px; /* Coins arrondis */
}
.card-body {
  padding: 20px;
}
.card-title {
  font-weight: bold;
  margin-bottom: 15px;
}
.card-text {
  margin-bottom: 20px;
}
.btn-primary {
  background-color: #007bff; /* Couleur de bouton primaire */
  border-color: #007bff;
}
.btn-primary:hover {
  background-color: #0056b3; /* Couleur au survol */
}
</style>
