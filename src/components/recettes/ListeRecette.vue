<template>
  <div class="container">
    <h2>{{ $t('Recipes Lists') }}</h2>
    <div class="d-flex justify-content-end mb-4">
      <router-link to="/recette/new" class="btn btn-danger">
        <i class="fas fa-plus"></i> {{ $t('new_recipe') }}
      </router-link>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ $t('title') }}</th>
          <th scope="col">{{ $t('ingredients') }}</th>
          <th scope="col">{{ $t('type') }}</th>
          <th scope="col">{{ $t('category') }}</th>
          <th scope="col">{{ $t('actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.recettes" :key="item.id">
          <td scope="row">{{ item.id }}</td>
          <td>{{ item.titre }}</td>
          <td>{{ item.ingredients }}</td>
          <td>{{ item.type }}</td>
          <td>{{ getCategoryById(item.categorie_id) }}</td>
          <td>
            <router-link :to="`/recette/show/${item.id}`" class="btn btn-info btn-sm">
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link :to="`/recette/edit/${item.id}`" class="btn btn-warning btn-sm">
              <i class="fas fa-edit"></i>
            </router-link>
            <button @click="confirmDelete(item.id)" class="btn btn-danger btn-sm">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRecetteStore } from '@/store/recetteStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useI18n } from 'vue-i18n'; 
import { useToast } from "vue-toastification";
const toast = useToast(); 
const store = useRecetteStore();
const categoryStore = useCategoryStore();
const { t } = useI18n();

const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      store.loadDataFromApi(),
      categoryStore.loadDataFromApi()
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});
const getCategoryById = (categorie_id) => {
  const category = categoryStore.categories.find(cat => cat.id === categorie_id);
  return category ? category.name : 'Unknown';
};
const confirmDelete = (id) => {
  if (confirm(t('confirm_delete'))) {
    deleteRecette(id);
    
  } 
};


const deleteRecette = async (id) => {
  try {
    await store.deleteRecette(id);
  } catch (error) {
    console.error('Error deleting recette:', error);
  }
};
</script>

<style scoped>
.btn-sm {
  margin: 0 2px;
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
</style>
