<script setup lang="ts">
import heroImage from '../assets/Hero.png';
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="container mx-auto px-4 py-12 md:py-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-lg mb-1 text-yellow-400">{{ props.profile.greeting }}</p>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">{{ profile.name }}</h1>
        <p class="text-xl text-gray-300 mb-6">{{ profile.title }}</p>
        
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#tentang" class="px-6 py-3 bg-yellow-500 text-gray-900 rounded-md font-medium hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1">
            Tentang Saya
          </a>
        </div>
      </div>
      <div class="hidden lg:block relative">
        <div class="decoration-circle absolute -right-10 top-10 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 rounded-full blur-md"></div>
        <div class="decoration-circle absolute left-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-yellow-400/15 to-transparent rounded-full blur-sm"></div>
        
        <div class="relative z-10 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-gray-700/50">
          <div class="relative w-full aspect-[4/3]">
            <img 
              :src="heroImage" 
              alt="Profile image" 
              class="h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-tr from-gray-900/50 via-gray-900/30 to-transparent"></div>
          </div>
        </div>
        
        <div class="absolute right-5 bottom-5 z-20">
          <div class="grid grid-cols-3 gap-2">
            <div v-for="i in 9" :key="i" class="w-2 h-2 bg-yellow-400/40 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div class="block lg:hidden mx-auto mt-6">
        <div class="relative">
          <div class="w-48 h-48 rounded-full overflow-hidden border-2 border-yellow-500 shadow-lg shadow-yellow-500/20">
            <img :src="heroImage" alt="profile image" class="h-full w-full object-cover" />
          </div>
          <div class="absolute -bottom-2 -right-2 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-2 border-yellow-500">
            <span class="text-yellow-400 text-xs font-medium">IT Dev</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float-slow {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.decoration-circle {
  animation: float-slow 6s ease-in-out infinite, pulse-glow 4s ease-in-out infinite;
}
</style>