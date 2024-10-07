// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/all.css';

// Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import router and i18n if you are using them
import router from './router'; // Adjust the path as necessary
import i18n from './i18n'; // Adjust the path as necessary

// Create a Vue app
const app = createApp(App);

// Register FontAwesomeIcon globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Create Pinia instance
const pinia = createPinia();

// Use Pinia for state management
app.use(pinia);

// Use the router if you have routing set up
app.use(router);

// Use i18n for internationalization
app.use(i18n);

// Mount the app
app.mount('#app');
