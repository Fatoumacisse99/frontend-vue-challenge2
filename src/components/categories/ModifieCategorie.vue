<template>
  <div class="container mt-5">
    <h2 class="text-center">{{ $t('modify category') }}</h2>

    <div v-if="category" class="d-flex justify-content-center">
      <div class="card w-50 shadow-sm">
        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="name" class="form-label">{{ $t('category name') }}</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="category.name"
                required
              />
            </div>

            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-success">{{ $t('save_changes') }}</button>
              <router-link to="/categories" class="btn btn-secondary">
                {{ $t('cancel') }}
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <p class="text-danger">{{ $t('category_not_found') }}</p>
      <router-link to="/categories" class="btn btn-secondary">
        {{ $t('back to list') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCategoryStore } from '@/store/categoryStore'; // Assuming categoryStore is in this path

const store = useCategoryStore();
const router = useRouter();
const route = useRoute();

const category = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id, 10);
  const existingCategory = store.getCategoryById(id); // Correct method from store
  if (existingCategory) {
    category.value = { ...existingCategory };
  } else {
    router.push('/categories'); // Redirect to category list if not found
  }
});

const onSubmit = () => {
  store.editCategory(category.value.id, category.value); // Use the correct store method
  router.push('/categories'); // Redirect to category list after save
};
</script>

<!-- Scoped CSS for styling -->
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
}

.card {
  background-color: #f8f9fa; /* Soft background color */
  border-radius: 10px;
}

.card-body {
  padding: 20px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
