import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast(); 
export const useCategoryStore = defineStore("categorieStore", {
  state: () => ({
    categories: [], 
  }),

  actions: {
    // Charger les catégories à partir de l'API
    async loadDataFromApi() {
      try {
        const response = await axios.get("http://localhost:3003/api/categories"); 
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        this.categories = []; 
      }
    },
    async addCategory(category) {
      try {
        const response = await axios.post("http://localhost:3003/api/categories", { name: category.name }); 
        this.categories.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie :", error);
      }
    },
    async editCategory(id, updatedCategory) {
      try {
        await axios.put(`http://localhost:3003/api/categories/${id}`, updatedCategory); 
        const index = this.categories.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          this.categories[index] = { ...updatedCategory, id };
        }
      } catch (error) {
        console.error("Erreur lors de la modification de la catégorie :", error);
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3003/api/categories/${id}`);
        this.categories = this.categories.filter((category) => category.id !== id);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Impossible de supprimer la catégorie car elle est utilisée dans des recettes.");
        } else {
          console.error("Erreur lors de la suppression de la catégorie :", error);
          toast.error("Une erreur est survenue lors de la suppression de la catégorie.");
        }
      }
    },
    
    getCategoryById(id) {
      return this.categories.find((category) => category.id === id);
    },
  },
});
