<template>
  <div class="container d-flex flex-column align-items-center mt-5">
    <h2>{{ $t('Recipes Details') }}</h2>
    <form class="col-md-6" v-if="recette">
      <div class="mb-3">
        <label for="titre" class="form-label"><strong>{{ $t('title') }}</strong></label>
        <input type="text" class="form-control" id="titre" v-model="recette.titre" readonly />
      </div>

      <div class="mb-3">
        <label for="ingredients" class="form-label"><strong>{{ $t('ingredients') }}</strong></label>
        <input type="text" class="form-control" id="ingredients" v-model="recette.ingredients" readonly />
      </div>

      <div class="mb-3">
        <label for="type" class="form-label"><strong>{{ $t('type') }}</strong></label>
        <input type="text" class="form-control" id="type" v-model="recette.type" readonly />
      </div>

      <div class="mb-3">
        <label for="category" class="form-label"><strong>{{ $t('category') }}</strong></label>
        <input type="text" class="form-control" id="category" :value="getCategoryById(recette.categorie_id)" readonly />
      </div>

      <div class="d-flex justify-content-end">
        <router-link to="/recette-list" class="btn btn-secondary mt-3">{{ $t('back to list') }}</router-link>
      </div>
    </form>

    <div v-else>
      <p>{{ $t('recipe_not_found') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRecetteStore } from '@/store/recetteStore';
import { useCategoryStore } from '@/store/categoryStore';

const route = useRoute();
const recetteStore = useRecetteStore();
const categoryStore = useCategoryStore();
const recette = ref(null);

onMounted(async () => {
  await recetteStore.loadDataFromApi();
  const id = parseInt(route.params.id);
  recette.value = recetteStore.recettes.find(rec => rec.id === id) || null;

  console.log('Recette récupérée:', recette.value);
});
const getCategoryById = (categoryId) => {
  const category = categoryStore.categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
