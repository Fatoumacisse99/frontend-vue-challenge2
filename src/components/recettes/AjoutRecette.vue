<template>
  <div class="container d-flex justify-content-center" style="min-height: 100vh;">
    <div class="col-md-6" style="margin-top: 20px;">
      <h3 class="text-center">{{ $t('add_recipe') }}</h3>
      <form @submit.prevent="onSubmit">
        <!-- Form Fields -->
        <div class="mb-3">
          <label for="titre" class="form-label">{{ $t('title') }}</label>
          <input type="text" class="form-control" id="titre" v-model="titre" required />
        </div>
        <div class="mb-3">
          <label for="ingredients" class="form-label">{{ $t('ingredients') }}</label>
          <input type="text" class="form-control" id="ingredients" v-model="ingredients" required />
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">{{ $t('type') }}</label>
          <select class="form-select" id="type" v-model="recipeType" required>
            <option value="" disabled>{{ $t('select_type') }}</option>
            <option value="Entree">{{ $t('type_options.entree') }}</option>
            <option value="plat principal">{{ $t('type_options.plat') }}</option>
            <option value="Dessert">{{ $t('type_options.dessert') }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="categorie" class="form-label">{{ $t('category') }}</label>
          <select class="form-select" id="category" v-model="selectedCategory" required>
            <option value="" disabled>{{ $t('select_category') }}</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <button class="btn btn-success w-100" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          {{ isLoading ? $t('loading') : $t('add_recipe') }}
        </button>
      </form>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';
import { useCategoryStore } from '../../store/categoryStore';
import { useRouter } from 'vue-router';

const store = useRecetteStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const titre = ref('');
const ingredients = ref('');
const recipeType = ref('dessert');
const selectedCategory = ref(null);
const categories = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

onMounted(async () => {
  await categoryStore.loadDataFromApi();
  categories.value = categoryStore.categories;
});

// Fonction pour soumettre une nouvelle recette
const onSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = ''; // Reset error message
  try {
    await store.addRecette({
      titre: titre.value,
      ingredients: ingredients.value,
      type: recipeType.value,
      categorie_id: selectedCategory.value,
    });
    // Clear the form
    titre.value = '';
    ingredients.value = '';
    recipeType.value = 'dessert';
    selectedCategory.value = null;
    router.push('/recette-list');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la recette :', error);
    errorMessage.value = 'Erreur lors de l\'ajout de la recette. Veuillez réessayer.'; // Display error message
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
