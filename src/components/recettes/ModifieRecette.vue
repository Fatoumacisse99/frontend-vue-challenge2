<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="col-md-6">
      <h3 class="text-center">{{ $t('Modify Recipe') }}</h3>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="titre" class="form-label">{{ $t('title') }}</label>
          <input type="text" class="form-control" id="titre" v-model="recette.titre" required />
        </div>
        <div class="mb-3">
          <label for="ingredients" class="form-label">{{ $t('ingredients') }}</label>
          <input type="text" class="form-control" id="ingredients" v-model="recette.ingredients" required />
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">{{ $t('type') }}</label>
          <select class="form-select" id="type" v-model="recette.type" required>
            <option value="Dessert">{{ $t('dessert') }}</option>
            <option value="Entree">{{ $t('entree') }}</option>
            <option value="plat principal">{{ $t('dish') }}</option>
          </select>
        </div>

        <!-- Dropdown for categories -->
        <div class="mb-3">
          <label for="categorie" class="form-label">{{ $t('Category') }}</label>
          <select class="form-select" id="categorie" v-model="recette.category" required>
            <option value="" disabled>{{ $t('Select a Category') }}</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <button class="btn btn-success w-100">{{ $t('modify') }}</button>
      </form>

      <div class="d-flex justify-content-end mt-3">
        <router-link to="/recette-list" class="btn btn-secondary">
          {{ $t('back to list') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRecetteStore } from '../../store/recetteStore';
import { useCategoryStore } from '../../store/categoryStore';

const store = useRecetteStore();
const categoryStore = useCategoryStore();
const router = useRouter();
const route = useRoute();

const recette = ref({
  titre: '',
  ingredients: '',
  type: '',
  category: '', // Use ID for category
});

const categories = ref([]);
const isLoading = ref(true); // Loading state

// Fetch categories and existing recipe on mount
onMounted(async () => {
  try {
    await categoryStore.loadDataFromApi();
    const id = parseInt(route.params.id, 10);
    const existingRecette = store.getById(id);
    
    if (existingRecette) {
      recette.value = { ...existingRecette };
    } else {
      router.push('/recette-list');
    }

    categories.value = categoryStore.categories; // Populate categories
  } catch (error) {
    console.error('Error loading data:', error);
    // Optionally, you can display an error message to the user
  } finally {
    isLoading.value = false; // Stop loading state
  }
});

const onSubmit = async () => {
  try {
    const updatedRecette = {
      ...recette.value, // Assuming recette.value has the necessary fields
      category_id: recette.value.category, // Ensure this matches your API structure
      id: parseInt(route.params.id, 10), // Make sure the ID is included
    };

    // Call the updateRecette action
    await store.updateRecette(updatedRecette);

    // Navigate to the list of recettes after a successful update
    router.push('/recette-list');
  } catch (error) {
    console.error('Error updating recette:', error);
    // Optionally display an error message to the user
  }
};

</script>

<style scoped>
/* Optional: You can add some custom styles here if needed */
.btn-success {
  margin-top: 10px;
}
</style>
