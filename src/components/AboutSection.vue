<script setup lang="ts">
import { ref } from 'vue';
import MoreInfoModal from './MoreInfoModal.vue';

defineProps({
  profile: {
    type: Object,
    required: true
  }
});

// Data skills dan frameworks Anda (tetap sama)
const skills = ref([
  { name: 'HTML & CSS', percentage: 90, type: 'Frontend' },
  { name: 'JavaScript', percentage: 85, type: 'Frontend' },
  { name: 'Dart', percentage: 80, type: 'Programming' },
  { name: 'C#', percentage: 75, type: 'Programming' }
]);

const frameworks = ref([
  { name: 'Vue.js', percentage: 88, type: 'Frontend' },
  { name: 'Flutter', percentage: 82, type: 'Mobile' },
  { name: 'WPF', percentage: 75, type: 'Dekstop' },
  { name: 'Laravel', percentage: 80, type: 'Backend' },
  { name: 'Nest.js', percentage: 78, type: 'Backend' }
]);

const activeTab = ref('skills');

// State untuk modal
const isModalOpen = ref(false);

// Toggle modal
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
  
  // Disable body scroll when modal is open
  if (isModalOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};
</script>

<template>
  <section id="tentang" class="container mx-auto px-4 py-16 md:py-24">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <p data-aos="fade-up" class="text-sm text-yellow-400 uppercase mb-2">{{ profile.bio }}</p>
        <h2 data-aos="fade-up" data-aos-delay="100" class="text-4xl font-bold mb-6">Tentang Saya</h2>
        <div data-aos="fade-up" data-aos-delay="200" class="space-y-4">
          <p>{{ profile.description }}</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <button 
            @click="toggleModal"
            class="mt-8 border-2 border-yellow-500 text-yellow-400 px-6 py-2 uppercase text-sm hover:bg-yellow-500 hover:text-gray-900 transition-all"
          >
            Lihat Lebih Banyak
          </button>
        </div>
      </div>
      
      <!-- Sisanya tetap sama seperti sebelumnya -->
      <div data-aos="fade-left" data-aos-delay="400" class="hidden lg:flex justify-center">
        <!-- Konten ilustrasi -->
        <div class="relative w-full">
          <!-- Elemen dekoratif -->
          <div class="decoration-circle absolute -right-10 top-10 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 rounded-full blur-md"></div>
          
          <div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <!-- Tab navigasi -->
            <div class="flex border-b border-gray-700">
              <button 
                @click="activeTab = 'skills'" 
                :class="[
                  'flex-1 py-3 px-4 text-sm font-medium transition-all', 
                  activeTab === 'skills' ? 'bg-gray-700 text-yellow-400' : 'text-gray-400 hover:text-gray-300'
                ]"
              >
                Bahasa Pemrograman
              </button>
              <button 
                @click="activeTab = 'frameworks'" 
                :class="[
                  'flex-1 py-3 px-4 text-sm font-medium transition-all', 
                  activeTab === 'frameworks' ? 'bg-gray-700 text-yellow-400' : 'text-gray-400 hover:text-gray-300'
                ]"
              >
                Framework
              </button>
            </div>
            
            <div v-show="activeTab === 'skills'" class="p-6 space-y-4">
              <div 
                v-for="(skill, index) in skills" 
                :key="skill.name"
                data-aos="fade-left" 
                :data-aos-delay="500 + (index * 100)"
                class="skill-item"
              >
                <div class="flex justify-between items-center mb-1">
                  <p class="text-sm font-medium text-gray-300">{{ skill.name }}</p>
                  <span class="text-xs text-yellow-400">{{ skill.percentage }}%</span>
                </div>
                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-500 rounded-full skill-progress" :style="`width: ${skill.percentage}%`"></div>
                </div>
                <span class="text-xs text-gray-500 mt-1">{{ skill.type }}</span>
              </div>
            </div>
            
            <!-- Tab content: Frameworks -->
            <div v-show="activeTab === 'frameworks'" class="p-6 space-y-4">
              <div 
                v-for="(framework, index) in frameworks" 
                :key="framework.name"
                data-aos="fade-left" 
                :data-aos-delay="500 + (index * 100)"
                class="skill-item"
              >
                <div class="flex justify-between items-center mb-1">
                  <p class="text-sm font-medium text-gray-300">{{ framework.name }}</p>
                  <span class="text-xs text-yellow-400">{{ framework.percentage }}%</span>
                </div>
                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div class="h-full skill-progress" 
                       :style="`width: ${framework.percentage}%`"
                       :class="{
                         'bg-blue-500': framework.type === 'Frontend',
                         'bg-green-500': framework.type === 'Backend',
                         'bg-purple-500': framework.type === 'Mobile',
                         'bg-amber-500': framework.type === 'Dekstop'
                       }"
                  ></div>
                </div>
                <span class="text-xs text-gray-500 mt-1">{{ framework.type }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile view -->
      <div class="lg:hidden" data-aos="fade-up" data-aos-delay="300">
        <div class="bg-gray-800 rounded-lg p-6 mt-6">
          <h3 class="text-xl font-semibold mb-4 text-center">Keahlian</h3>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="(skill) in [...skills, ...frameworks].slice(0, 6)" 
              :key="skill.name"
              class="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg"
            >
              <span class="text-sm font-medium mb-1">{{ skill.name }}</span>
              <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-yellow-400 font-bold">
                {{ skill.percentage }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal untuk "Lihat Lebih Banyak" -->
    <MoreInfoModal :is-open="isModalOpen" @close="toggleModal" />
  </section>
</template>

<style scoped>
/* Tetap sama seperti sebelumnya */
.skill-progress {
  transition: width 1.5s ease-out;
  width: 0;
}

.skill-item {
  opacity: 0;
  transform: translateX(20px);
  animation: fadeInRight 0.6s ease forwards;
  animation-delay: calc(var(--index) * 100ms);
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Efek hover pada item skill */
.skill-item:hover .skill-progress {
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}
</style>