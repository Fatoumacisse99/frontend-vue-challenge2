import { createRouter, createWebHistory } from "vue-router";

// Importation des composants
import Home from '../components/Home.vue';
import AjoutRecette from '../components/recettes/AjoutRecette.vue';
import ModifieRecette from '../components/recettes/ModifieRecette.vue';
import ListeRecette from '../components/recettes/ListeRecette.vue';
import DetailRecette from '../components/recettes/DetailRecette.vue';

import ListeCategorie from '../components/categories/ListeCategorie.vue';
import AjoutCategorie from '../components/categories/AjoutCategorie.vue';
import ModifieCategorie from '../components/categories/ModifieCategorie.vue';
import DetailCategorie from '../components/categories/DetailCategorie.vue';

// Définition des routes
const routes = [
  {
    path: "/",
    name: 'home',
    component: Home,
  },
  {
    path: "/recette-list",
    name: 'recettes',
    component: ListeRecette,
  },
  {
    path: "/recette/new",
    name: 'ajout-recette',
    component: AjoutRecette,
  },
  {
    path: "/recette/edit/:id",
    name: 'modifier-recette',
    component: ModifieRecette,
    props: true,
  },
  {
    path: "/recette/show/:id",
    name: 'detail-recette',
    component: DetailRecette,
    props: true,
  },
  {
    path: '/categories',
    name: 'ListeCategorie',
    component: ListeCategorie,
  },
  {
    path: '/category/new',
    name: 'AjoutCategorie',
    component: AjoutCategorie,
  },
  {
    path: '/category/show/:id',
    name: 'DetailCategorie',
    component: DetailCategorie,
    props: true,
  },
  {
    path: '/category/edit/:id',
    name: 'ModifieCategorie',
    component: ModifieCategorie,
    props: true,
  },
  {
    path: "/categorie/:categoryId/recettes",
    name: 'recettes-by-category',
    component: ListeRecette,
    props: true,
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
