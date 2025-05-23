<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define props with proper typing
const props = defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits(['close']);

// Define interface for certificate
interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  pdfUrl: string;
  description: string;
  skills: string[];
}

// Define interface for skill category
interface SkillCategory {
  category: string;
  items: string[];
}

// Define interface for education
interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
}

const modalActive = ref(false);
const selectedCertificate = ref<Certificate | null>(null);
const showCertificateDetail = ref(false);

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (showCertificateDetail.value) {
      closeCertificateDetail();
    } else {
      emit('close');
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey);
  setTimeout(() => {
    modalActive.value = true;
  }, 10);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey);
});

const certifications = ref<Certificate[]>([
  {
    id: 1,
    name: 'Backend Pemula',
    issuer: 'Dicoding Indonesia',
    date: '03 Mei 2025',
    pdfUrl: '/certificates/backend_pemula.pdf',
    description: 'Sertifikasi yang memvalidasi pengetahuan dasar tentang pengembangan backend menggunakan Node.js dan Express.',
    skills: ['Backend', 'Node.js', 'Express', 'RESTful API']
  },
  {
    id: 2,
    name: 'Cloud AWS',
    issuer: 'Dicoding Indonesia',
    date: '02 Mei 2025',
    pdfUrl: '/certificates/sertifikat cloud aws.pdf',
    description: 'Program intensif tentang layanan cloud computing dengan menggunakan Amazon Web Services.',
    skills: ['Cloud Computing', 'AWS', 'Infrastructure', 'DevOps']
  },
  {
    id: 3,
    name: 'Dart Programming',
    issuer: 'Dicoding Indonesia',
    date: '14 November 2024',
    pdfUrl: '/certificates/sertifikat dart.pdf',
    description: 'Kursus mendalam tentang bahasa pemrograman Dart, yang digunakan untuk pengembangan aplikasi Flutter.',
    skills: ['Dart', 'Programming', 'Flutter', 'Mobile Development']
  },
  {
    id: 4,
    name: 'JavaScript Fundamentals',
    issuer: 'Dicoding Indonesia',
    date: '22 April 2025',
    pdfUrl: '/certificates/sertifikat javscript.pdf',
    description: 'Sertifikasi yang mencakup konsep dasar dan lanjutan JavaScript untuk pengembangan web modern.',
    skills: ['JavaScript', 'Web Development', 'Frontend', 'ES6+']
  }
]);

const additionalSkills = ref<SkillCategory[]>([
  { 
    category: 'Software Development', 
    items: ['Desktop Applications', 'Mobile Applications', 'Web Applications', 'API Development', 'Database Design']
  },
  { 
    category: 'Tools & Environment', 
    items: ['Git & GitHub', 'Docker', 'Visual Studio / VS Code', 'Android Studio', 'Figma']
  },
  { 
    category: 'Methodologies', 
    items: ['Agile', 'Scrum', 'DevOps', 'CI/CD', 'Test-Driven Development']
  }
]);

const education = ref<Education[]>([
  {
    school: 'SMK NEGERI 1 Bantul',
    degree: 'Rekayasa Perangkat Lunak (RPL)',
    period: '2022 - 2025',
    description: 'Fokus pada pengembangan aplikasi web, mobile, dan desktop dengan berbagai teknologi modern.'
  }
]);

const activeSection = ref('skills');

const viewCertificate = (cert: Certificate) => {
  selectedCertificate.value = cert;
  showCertificateDetail.value = true;
};

const closeCertificateDetail = () => {
  showCertificateDetail.value = false;
  // Delay untuk animasi keluar
  setTimeout(() => {
    selectedCertificate.value = null;
  }, 300);
};
</script>

<template>
  <!-- Template tidak berubah -->
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 overflow-y-auto">
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-black bg-opacity-75 transition-opacity" 
      :class="{ 'opacity-100': modalActive, 'opacity-0': !modalActive }"
      @click="emit('close')"
    ></div>
    
    <!-- Modal Content -->
    <div 
      class="relative bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
      :class="{ 'opacity-100 translate-y-0': modalActive, 'opacity-0 translate-y-4': !modalActive }"
    >
      <!-- Header with close button -->
      <div class="flex justify-between items-center p-6 border-b border-gray-800">
        <h2 class="text-2xl font-bold text-white">Informasi Lebih Lanjut</h2>
        <button 
          @click="emit('close')" 
          class="text-gray-400 hover:text-white focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Navigation Tabs -->
      <div class="flex border-b border-gray-800 bg-gray-800/50">
        <button 
          v-for="section in ['skills', 'education', 'certifications']" 
          :key="section"
          @click="activeSection = section" 
          :class="[
            'px-5 py-3 text-sm font-medium transition-all border-b-2',
            activeSection === section 
              ? 'border-yellow-500 text-yellow-400' 
              : 'border-transparent text-gray-400 hover:text-white'
          ]"
        >
          {{ {
            'skills': 'Keahlian Tambahan', 
            'education': 'Pendidikan',
            'certifications': 'Sertifikasi'
          }[section] }}
        </button>
      </div>
      
      <!-- Modal Body with tab content -->
      <div class="p-6">
        <div v-show="activeSection === 'skills'">
          <p class="text-gray-400 mb-6">
            Selain kemampuan utama dalam bahasa pemrograman dan framework, saya juga memiliki keahlian dalam berbagai area berikut:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(category, index) in additionalSkills" 
              :key="`category-${index}`"
              class="bg-gray-800 p-5 rounded-lg"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <h3 class="text-lg font-semibold text-yellow-400 mb-4">{{ category.category }}</h3>
              <ul class="space-y-2">
                <li 
                  v-for="(item, itemIndex) in category.items" 
                  :key="`item-${itemIndex}`"
                  class="flex items-center text-gray-300"
                >
                  <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Education Section -->
        <div v-show="activeSection === 'education'">
          <div 
            v-for="(edu, index) in education" 
            :key="`edu-${index}`"
            class="mb-8 border-l-2 border-yellow-500 pl-6 py-2"
          >
            <div class="flex flex-wrap justify-between items-start mb-2">
              <h3 class="text-xl font-semibold text-white">{{ edu.school }}</h3>
              <span class="text-yellow-400 text-sm bg-yellow-400/10 px-3 py-1 rounded-full">{{ edu.period }}</span>
            </div>
            <p class="text-lg text-gray-300 mb-2">{{ edu.degree }}</p>
            <p class="text-gray-400">{{ edu.description }}</p>
          </div>
          
          <div class="mt-8 bg-gray-800 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-yellow-400 mb-4">Kegiatan Tambahan</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="text-yellow-400 mr-3">•</span>
                <p class="text-gray-300">Anggota tim pengembangan website sekolah</p>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-400 mr-3">•</span>
                <p class="text-gray-300">Peserta aktif dalam kompetisi programming tingkat provinsi</p>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-400 mr-3">•</span>
                <p class="text-gray-300">Kontributor pada proyek open source lokal</p>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Certifications Section -->
        <div v-show="activeSection === 'certifications'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="cert in certifications" 
              :key="`cert-${cert.id}`"
              class="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all cursor-pointer"
              @click="viewCertificate(cert)"
            >
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-white">{{ cert.name }}</h3>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">{{ cert.issuer }}</span>
                <span class="text-yellow-400">{{ cert.date }}</span>
              </div>
              <div class="mt-2 flex justify-end">
                <span class="text-xs text-yellow-400 italic">Klik untuk lihat detail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-6 border-t border-gray-800 flex justify-between items-center">
        <p class="text-sm text-gray-400">Selalu belajar dan mengembangkan keterampilan baru</p>
        <button 
          @click="emit('close')" 
          class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-all"
        >
          Tutup
        </button>
      </div>
    </div>
    
    <!-- Certificate Detail Modal -->
    <div 
      v-if="selectedCertificate" 
      class="fixed inset-0 z-60 flex items-center justify-center p-4"
    >
      <div 
        class="absolute inset-0 bg-black bg-opacity-90 transition-opacity"
        :class="{ 'opacity-100': showCertificateDetail, 'opacity-0': !showCertificateDetail }"
        @click="closeCertificateDetail"
      ></div>
      
      <div 
        class="relative bg-gray-900 border border-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
        :class="{ 'opacity-100 scale-100': showCertificateDetail, 'opacity-0 scale-95': !showCertificateDetail }"
      >
        <div class="absolute top-4 right-4 z-10">
          <button 
            @click="closeCertificateDetail" 
            class="bg-gray-800 rounded-full p-2 text-white hover:bg-gray-700 transition-all"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="flex flex-col md:flex-row">
          <!-- PDF Viewer Section -->
          <div class="md:w-2/3 bg-gray-800 p-2 md:p-4 h-[70vh]">
            <!-- Embed PDF viewer -->
            <object 
              :data="selectedCertificate.pdfUrl" 
              type="application/pdf" 
              class="w-full h-full rounded border border-gray-700"
            >
              <div class="flex flex-col items-center justify-center h-full bg-gray-800 rounded p-6 text-center">
                <p class="text-gray-400 mb-4">Browser Anda tidak mendukung tampilan PDF langsung.</p>
                <a 
                  :href="selectedCertificate.pdfUrl" 
                  target="_blank" 
                  class="px-4 py-2 bg-yellow-500 text-gray-900 rounded-md text-sm font-medium hover:bg-yellow-400 transition-all"
                >
                  Buka PDF
                </a>
              </div>
            </object>
          </div>
          
          <!-- Certificate Details -->
          <div class="md:w-1/3 p-6">
            <h3 class="text-xl font-bold text-white mb-2">{{ selectedCertificate.name }}</h3>
            <div class="mb-4">
              <p class="text-yellow-400 text-sm">{{ selectedCertificate.issuer }}</p>
              <p class="text-gray-400 text-sm">{{ selectedCertificate.date }}</p>
            </div>
            
            <div class="mb-4">
              <h4 class="text-sm font-semibold text-gray-300 uppercase mb-2">Deskripsi</h4>
              <p class="text-gray-400 text-sm">{{ selectedCertificate.description }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-semibold text-gray-300 uppercase mb-2">Skills</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(skill, index) in selectedCertificate.skills" 
                  :key="`skill-${index}`"
                  class="text-xs px-2 py-1 rounded-full bg-gray-800 text-yellow-400 border border-yellow-500"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            
            <div class="mt-6 space-y-2">
              <a 
                :href="selectedCertificate.pdfUrl" 
                download
                class="w-full inline-block text-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-md text-sm font-medium hover:bg-yellow-400 transition-all"
              >
                Download PDF
              </a>
              
              <a 
                :href="selectedCertificate.pdfUrl" 
                target="_blank"
                class="w-full inline-block text-center px-4 py-2 border border-yellow-500 text-yellow-400 rounded-md text-sm font-medium hover:bg-yellow-400 hover:text-gray-900 transition-all"
              >
                Buka di Tab Baru
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease;
}

.transition-all {
  transition: all 0.3s ease;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

/* Certificate hover effect */
.cursor-pointer {
  position: relative;
  overflow: hidden;
}

.cursor-pointer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(245, 158, 11, 0) 0%, rgba(245, 158, 11, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor-pointer:hover::after {
  opacity: 1;
}
</style>