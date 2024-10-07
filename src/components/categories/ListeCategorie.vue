<template>
  <div class="container-w-25">
    <h2>{{ $t('category_list') }}</h2> <!-- Updated key for category list -->
    <div class="d-flex justify-content-end mb-4">
      <router-link to="/category/new" class="btn btn-danger">
        <i class="fas fa-plus"></i> {{ $t('new_category') }} <!-- Updated key for new category -->
      </router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="col-id">Id</th>
          <th scope="col" class="col-name">{{ $t('category_name') }}</th> <!-- Updated key for category name -->
          <th scope="col" class="col-actions">{{ $t('actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.categories" :key="item.id">
          <td scope="row" class="col-id">{{ item.id }}</td>
          <td class="col-name">{{ item.name }}</td>
          <td class="col-actions">
            <router-link :to="`/category/show/${item.id}`" class="btn btn-info btn-sm">
              <i class="fas fa-eye"></i> {{ $t('view') }} <!-- Updated key for view -->
            </router-link>
            <router-link :to="`/category/edit/${item.id}`" class="btn btn-warning btn-sm">
              <i class="fas fa-edit"></i> {{ $t('edit') }} <!-- Updated key for edit -->
            </router-link>
            <button @click="confirmDelete(item.id)" class="btn btn-danger btn-sm">
              <i class="fas fa-trash"></i> {{ $t('delete') }} <!-- Updated key for delete -->
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref ,onMounted ,computed } from "vue";
import { useCategoryStore } from '@/store/categoryStore';
import { useRouter } from 'vue-router';

const store = useCategoryStore();
const router = useRouter();

onMounted(() => {
 store.loadDataFromApi()
});
// Function to confirm deletion
const confirmDelete = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
    deleteCategory(id);
  }
};

// Function to delete category
const deleteCategory = (id) => {
  store.deleteCategory(id); // Make sure this method exists in your store
};


</script>

<style scoped>
.container-w-25 {
  margin-left: 10%;
  margin-right: 10%;
}

.btn-sm {
  margin: 0 2px;
}

.table {
  margin: auto;
  width: 100%;
}

.table th, .table td {
  padding: 0.5rem;
}

.col-id {
  width: 10%;
}

.col-name {
  width: 40%;
}

.col-actions {
  width: 30%;
}
</style>
