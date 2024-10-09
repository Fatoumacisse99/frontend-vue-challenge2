<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header">
        <h2>{{ $t('add_category') }}</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="ajouterCategorie">
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t('category_name') }}:</label>
            <input 
              v-model="newCategory.name" 
              id="name" 
              class="form-control" 
              placeholder="{{ $t('enter_category_name') }}"
              required 
            />
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">{{ $t('add') }}</button>
            <button @click="annuler" type="button" class="btn btn-secondary">{{ $t('cancel') }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from '../../store/categoryStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
const toast = useToast(); 

export default {
  setup() {
    const categoryStore = useCategoryStore();
    const newCategory = ref({ name: '' });
    const router = useRouter();

    const ajouterCategorie = () => {
      // Vérifiez si la catégorie existe déjà
      const existingCategory = categoryStore.categories.find(
        category => category.name.toLowerCase() === newCategory.value.name.toLowerCase()
      );

      if (existingCategory) {
        // Afficher un message d'erreur si la catégorie existe déjà
        toast.error('Cette catégorie existe déjà.');
      } else {
        // Si la catégorie n'existe pas, l'ajouter
        categoryStore.addCategory(newCategory.value);
        toast.success('Catégorie ajoutée avec succès.');
        newCategory.value.name = '';
        router.push('/categories');
      }
    };
    const annuler = () => {
      newCategory.value.name = '';
      router.push('/categories');
      
    };

    return {
      newCategory,
      ajouterCategorie,
      annuler,
    };
  },
};
</script>

<style scoped>
.card {
  max-width: 500px;
  margin: auto;
  margin-top: 80px;
}
</style>
