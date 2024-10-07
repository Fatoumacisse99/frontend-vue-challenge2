<template>
  <div class="container-fluid">
    <!-- Fixed navigation bar with Bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">{{ $t('home') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recette/new" class="nav-link">{{ $t('new_recipe') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recette-list" class="nav-link">{{ $t('recipe_list') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categories" class="nav-link">{{ $t('categories') }}</router-link>
            </li>
          </ul>
          <div class="mx-auto position-relative">
            <!-- Centered Search Bar with Icon -->
            <input
              type="text"
              class="form-control"
              placeholder="Search" 
              aria-label="Search"
              @input="onSearch"
              style="width: 300px;" 
            />
            <button @click="onSearchClick" class="btn btn-light position-absolute" style="right: 0; top: 0; border-radius: 0 5px 5px 0;">
              <i class="fas fa-search"></i> <!-- Font Awesome search icon -->
            </button>
          </div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- Language selector -->
              <select @change="changeLanguage($event)" class="form-select bg-dark text-white">
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="content" style="margin-top: 80px;">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function changeLanguage(event) {
  locale.value = event.target.value
}

function onSearch(event) {
  const searchTerm = event.target.value;
  // Here you can implement the search logic, e.g., filter recipes based on the search term
  console.log("Searching for:", searchTerm);
}

function onSearchClick() {
  // Trigger search logic when the search icon is clicked
  const searchInput = document.querySelector('input[aria-label="Search"]');
  const searchTerm = searchInput.value;
  console.log("Searching for:", searchTerm);
  // Add your search logic here
}
</script>

<style scoped>
/* Adjust top margin to prevent overlap with the navigation bar */
.content {
  padding-top: 20px;
}
</style>
