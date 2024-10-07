// src/store/categorieStore.js
import { defineStore } from "pinia";
import axios from "axios"; // Assurez-vous d'utiliser votre instance Axios

export const useCategoryStore = defineStore("categorieStore", {
  state: () => ({
    categories: [], // Initialement un tableau vide
  }),

  actions: {
    // Charger les catégories à partir de l'API
    async loadDataFromApi() {
      try {
        const response = await axios.get("http://localhost:3003/api/categories"); // Ajustez l'URL en fonction de votre backend
        this.categories = response.data; // Assurez-vous que la réponse contient un tableau de catégories
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        this.categories = []; // Réinitialiser à un tableau vide en cas d'erreur
      }
    },

    // Ajouter une nouvelle catégorie
    async addCategory(category) {
      try {
        const response = await axios.post("http://localhost:3003/api/categories", { name: category.name }); // Ajustez l'URL
        this.categories.push(response.data); // Assurez-vous que la réponse contient la catégorie ajoutée
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie :", error);
      }
    },

    // Modifier une catégorie existante
    async editCategory(id, updatedCategory) {
      try {
        await axios.put(`http://localhost:3003/api/categories/${id}`, updatedCategory); // Ajustez l'URL
        const index = this.categories.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          this.categories[index] = { ...updatedCategory, id };
        }
      } catch (error) {
        console.error("Erreur lors de la modification de la catégorie :", error);
      }
    },

    // Supprimer une catégorie
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3003/api/categories/${id}`); // Ajustez l'URL
        this.categories = this.categories.filter((category) => category.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error);
      }
    },

    // Obtenir une catégorie par ID
    getCategoryById(id) {
      return this.categories.find((category) => category.id === id);
    },
  },
});
