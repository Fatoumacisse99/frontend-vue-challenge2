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
  categorie_id: '', 
});

const categories = ref([]);
const isLoading = ref(true); 
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

    categories.value = categoryStore.categories; 
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false; 
  }
});

const onSubmit = async () => {
  
  try {
    const updatedRecette = {
      ...recette.value, 
      category_id: recette.value.category, 
      id: parseInt(route.params.id, 10), 
    };
    await store.updateRecette(updatedRecette);
    router.push('/recette-list');
  } catch (error) {
    console.error('Error updating recette:', error);
  
  }
};

</script>

<style scoped>
.btn-success {
  margin-top: 10px;
}
</style>
