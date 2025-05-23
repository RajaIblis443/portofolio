<script setup lang="ts">
import { ref } from 'vue';

// Data social media links
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
</script>

<template>
  <section id="kontak" class="container mx-auto px-4 py-16 md:py-24">
    <div data-aos="fade-up">
      <h2 class="text-3xl font-bold text-center mb-6">Hubungi Saya</h2>
      <p class="text-center text-gray-400 max-w-lg mx-auto mb-12">
        Tertarik untuk bekerja sama? Anda dapat menghubungi saya melalui salah satu platform di bawah ini.
      </p>
    </div>

    <!-- Social Media Links dengan efek hover yang lebih halus -->
    <div class="max-w-3xl mx-auto">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <a 
          v-for="(social, index) in socialLinks" 
          :key="index" 
          :href="social.url" 
          target="_blank" 
          rel="noopener noreferrer"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
          :class="[
            'social-link flex flex-col items-center justify-center p-6 rounded-lg', 
            social.color
          ]"
        >
          <i :class="[social.icon, 'text-2xl mb-2 icon-hover']"></i>
          <span class="text-sm font-medium">{{ social.name }}</span>
        </a>
      </div>
    </div>

    <div class="max-w-3xl mx-auto mt-8 hidden">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <a 
          v-for="(social, index) in socialLinks" 
          :key="index" 
          :href="social.url" 
          target="_blank" 
          rel="noopener noreferrer"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          class="alt-social-link flex items-center p-4 bg-gray-800 rounded-lg"
        >
          <div :class="['w-12 h-12 rounded-full flex items-center justify-center text-white', social.color]">
            <span class="text-xl font-bold">{{ social.name.charAt(0) }}</span>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium">{{ social.name }}</h3>
            <p class="text-sm text-gray-400">Kunjungi {{ social.name }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.social-link {
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.social-link:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.social-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transition: height 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}

.social-link:hover::after {
  height: 100%;
}

.social-link i, .social-link span {
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.social-link:hover i {
  transform: scale(1.2);
}

.social-link:hover span {
  transform: translateY(2px);
}

/* Alternatif social link style */
.alt-social-link {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.alt-social-link:hover {
  transform: translateX(5px);
  background-color: rgba(31, 41, 55, 0.8);
}
</style>