<script setup lang="ts">
import { ref, computed } from 'vue';

const currentYear = new Date().getFullYear();

const socialLinks = ref([
  {
    name: 'Instagram',
    icon: 'fab fa-instagram',
    url: 'https://instagram.com/bangong_78',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    name: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    url: 'https://linkedin.com/in/bagas-kara-344a2a320',
    color: 'bg-blue-600'
  },
  {
    name: 'WhatsApp',
    icon: 'fab fa-whatsapp',
    url: 'https://wa.me/6285142964848',
    color: 'bg-green-500'
  },
  {
    name: 'GitHub',
    icon: 'fab fa-github',
    url: 'https://github.com/RajaIblis443',
    color: 'bg-gray-700'
  },
  {
    name: 'Email',
    icon: 'fas fa-envelope',
    url: 'mailto:bagaskaraplay90@gmail.com',
    color: 'bg-red-500'
  }
]);

// Filter hanya media sosial tertentu untuk footer
const footerSocials = computed(() => {
  return socialLinks.value.filter(social => 
    ['Instagram', 'LinkedIn', 'GitHub'].includes(social.name)
  );
});
</script>

<template>
  <footer class="container mx-auto px-4 py-8 border-t border-gray-800">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="text-sm text-gray-500">
        &copy; {{ currentYear }} Bagas Kara. Hak Cipta Dilindungi.
      </div>
      
      <div class="flex flex-wrap gap-4 mt-4 md:mt-0">
        <a 
          v-for="social in footerSocials" 
          :key="social.name"
          :href="social.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="footer-social-link flex items-center px-3 py-2 rounded-md transition-all"
          :class="[social.name.toLowerCase() + '-hover']"
        >
          <i :class="[social.icon, 'mr-2']"></i>
          <span>{{ social.name }}</span>
        </a>
      </div>
    </div>
    
    <!-- Links section -->
    <div class="mt-6 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between">
      <div class="text-xs text-gray-500">
        <p>Dibuat dengan Vue.js dan Tailwind CSS</p>
      </div>
      
      <div class="mt-4 md:mt-0">
        <ul class="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
          <li><a href="#beranda" class="hover:text-white transition-colors">Beranda</a></li>
          <li><a href="#tentang" class="hover:text-white transition-colors">Tentang</a></li>
          <li><a href="#proyek" class="hover:text-white transition-colors">Proyek</a></li>
          <li><a href="#kontak" class="hover:text-white transition-colors">Kontak</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-social-link {
  color: #9ca3af; /* text-gray-400 */
  background-color: rgba(31, 41, 55, 0.5); /* bg-gray-800/50 */
}

.footer-social-link:hover {
  color: white;
  transform: translateY(-2px);
}

.instagram-hover:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.linkedin-hover:hover {
  background-color: #0077b5;
}

.github-hover:hover {
  background-color: #333;
}

.whatsapp-hover:hover {
  background-color: #25D366;
}

.email-hover:hover {
  background-color: #ea4335;
}

.transition-colors {
  transition: color 0.3s ease;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>