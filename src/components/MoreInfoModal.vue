<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits(['close']);


interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  pdfUrl: string;
  description: string;
  skills: string[];
}

interface SkillCategory {
  category: string;
  items: string[];
  icon: string;
}

interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
}

interface Activity {
  description: string;
  icon: string; 
}

const modalActive = ref(false);
const selectedCertificate = ref<Certificate | null>(null);
const showCertificateDetail = ref(false);

const isPdfAvailable = ref(true);

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
  },
  {
    id: 5,
    name: 'Juara 3 IT Bussiness Solution',
    issuer: 'Provinsi DIY',
    date: '20 April 2025',
    description: 'Sertifikat penghargaan sebagai juara 3 dalam kompetisi IT Bussiness Solution tingkat provinsi.',
    skills: ['IT Bussiness', 'Laravel', 'API',],
    pdfUrl: '/certificates/sertifikat juara 3 it bussiness solution.pdf'
  }
]);

const additionalSkills = ref<SkillCategory[]>([
  { 
    category: 'Software Development', 
    items: ['Desktop Applications', 'Mobile Applications', 'Web Applications', 'API Development', 'Database Design'],
    icon: 'fas fa-laptop-code'
  },
  { 
    category: 'Tools & Environment', 
    items: ['Git & GitHub', 'Docker', 'Visual Studio / VS Code', 'Android Studio', 'Figma'],
    icon: 'fas fa-tools'
  },
  { 
    category: 'Methodologies', 
    items: ['Agile', 'Scrum', 'DevOps', 'CI/CD', 'Test-Driven Development'],
    icon: 'fas fa-sitemap'
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

const activities = ref<Activity[]>([
  {
    description: 'Peserta aktif dalam kompetisi programming tingkat provinsi',
    icon: 'fas fa-trophy'
  },
]);

const activeSection = ref('skills');

// Fungsi untuk memeriksa ketersediaan file
const checkPdfAvailability = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error("Error checking file:", error);
    return false;
  }
};

// Modifikasi viewCertificate untuk mengecek ketersediaan PDF
const viewCertificate = async (cert: Certificate) => {
  selectedCertificate.value = cert;
  showCertificateDetail.value = true;
  
  // Cek ketersediaan PDF
  isPdfAvailable.value = await checkPdfAvailability(cert.pdfUrl);
};

const closeCertificateDetail = () => {
  showCertificateDetail.value = false;
  setTimeout(() => {
    selectedCertificate.value = null;
  }, 300);
};
</script>

<template>
  <Teleport to="#modal-container">
    <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 overflow-y-auto">
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
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <!-- Navigation Tabs -->
        <div class="flex border-b border-gray-800 bg-gray-800/50">
          <button 
            v-for="section in ['skills', 'education', 'certifications']" 
            :key="section"
            @click="activeSection = section" 
            :class="[
              'px-5 py-3 text-sm font-medium transition-all border-b-2 flex items-center',
              activeSection === section 
                ? 'border-yellow-500 text-yellow-400' 
                : 'border-transparent text-gray-400 hover:text-white'
            ]"
          >
            <i :class="[
              section === 'skills' ? 'fas fa-brain' : 
              section === 'education' ? 'fas fa-graduation-cap' : 
              'fas fa-certificate',
              'mr-2'
            ]"></i>
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
                class="bg-gray-800 p-5 rounded-lg hover:bg-gray-700/50 transition-all"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
              >
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3">
                    <i :class="[category.icon, 'text-yellow-400']"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-yellow-400">{{ category.category }}</h3>
                </div>
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
                <h3 class="text-xl font-semibold text-white flex items-center">
                  <i class="fas fa-school text-yellow-400 mr-2"></i>
                  {{ edu.school }}
                </h3>
                <span class="text-yellow-400 text-sm bg-yellow-400/10 px-3 py-1 rounded-full flex items-center">
                  <i class="far fa-calendar-alt mr-1"></i>
                  {{ edu.period }}
                </span>
              </div>
              <p class="text-lg text-gray-300 mb-2">{{ edu.degree }}</p>
              <p class="text-gray-400">{{ edu.description }}</p>
            </div>
            
            <div class="mt-8 bg-gray-800 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
                <i class="fas fa-tasks text-yellow-400 mr-2"></i>
                Kegiatan Tambahan
              </h3>
              <ul class="space-y-3">
                <li 
                  v-for="(activity, index) in activities" 
                  :key="index"
                  class="flex items-start"
                >
                  <div class="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 mt-0.5">
                    <i :class="[activity.icon, 'text-yellow-400']"></i>
                  </div>
                  <p class="text-gray-300">{{ activity.description }}</p>
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
                    <i class="fas fa-award text-yellow-400"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-white">{{ cert.name }}</h3>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400 flex items-center">
                    <i class="fas fa-building mr-1"></i>
                    {{ cert.issuer }}
                  </span>
                  <span class="text-yellow-400 flex items-center">
                    <i class="far fa-calendar mr-1"></i>
                    {{ cert.date }}
                  </span>
                </div>
                <div class="mt-2 flex justify-end">
                  <span class="text-xs text-yellow-400 italic flex items-center">
                    <i class="fas fa-eye mr-1"></i>
                    Klik untuk lihat detail
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="p-6 border-t border-gray-800 flex justify-between items-center">
          <p class="text-sm text-gray-400 flex items-center">
            <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
            Selalu belajar dan mengembangkan keterampilan baru
          </p>
          <button 
            @click="emit('close')" 
            class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-all flex items-center"
          >
            <i class="fas fa-times-circle mr-1"></i>
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
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="flex flex-col md:flex-row">
            <!-- PDF Viewer Section -->
            <div class="md:w-2/3 bg-gray-800 p-2 md:p-4 h-[70vh]">
              <!-- PDF tersedia -->
              <template v-if="isPdfAvailable">
                <object 
                  :data="selectedCertificate.pdfUrl" 
                  type="application/pdf" 
                  class="w-full h-full rounded border border-gray-700"
                >
                  <div class="flex flex-col items-center justify-center h-full bg-gray-800 rounded p-6 text-center">
                    <p class="text-gray-400 mb-4">
                      <i class="fas fa-exclamation-circle text-yellow-400 mr-2"></i>
                      Browser Anda tidak mendukung tampilan PDF langsung.
                    </p>
                    <a 
                      :href="selectedCertificate.pdfUrl" 
                      target="_blank" 
                      class="px-4 py-2 bg-yellow-500 text-gray-900 rounded-md text-sm font-medium hover:bg-yellow-400 transition-all flex items-center justify-center"
                    >
                      <i class="fas fa-external-link-alt mr-2"></i>
                      Buka PDF
                    </a>
                  </div>
                </object>
              </template>
              
              <!-- PDF tidak tersedia -->
              <template v-else>
                <div class="flex flex-col items-center justify-center h-full bg-gray-800 rounded p-6 text-center">
                  <div class="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                    <i class="fas fa-file-pdf text-yellow-400 text-3xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-white mb-3">File Belum Tersedia</h3>
                  <p class="text-gray-400 mb-6 max-w-md">
                    Sertifikat ini belum memiliki file PDF yang tersedia. Silakan hubungi saya jika Anda ingin melihat bukti sertifikat.
                  </p>
                  <button
                    @click="isPdfAvailable = await checkPdfAvailability(selectedCertificate.pdfUrl)"
                    class="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-all flex items-center justify-center"
                  >
                    <i class="fas fa-sync-alt mr-2"></i>
                    Coba Muat Ulang
                  </button>
                </div>
              </template>
            </div>
            
            <!-- Certificate Details -->
            <div class="md:w-1/3 p-6">
              <h3 class="text-xl font-bold text-white mb-2 flex items-center">
                <i class="fas fa-certificate text-yellow-400 mr-2"></i>
                {{ selectedCertificate.name }}
              </h3>
              <div class="mb-4">
                <p class="text-yellow-400 text-sm flex items-center">
                  <i class="fas fa-building mr-2"></i>
                  {{ selectedCertificate.issuer }}
                </p>
                <p class="text-gray-400 text-sm flex items-center">
                  <i class="far fa-calendar-alt mr-2"></i>
                  {{ selectedCertificate.date }}
                </p>
              </div>
              
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-gray-300 uppercase mb-2 flex items-center">
                  <i class="fas fa-info-circle mr-2"></i>
                  Deskripsi
                </h4>
                <p class="text-gray-400 text-sm">{{ selectedCertificate.description }}</p>
              </div>
              
              <div>
                <h4 class="text-sm font-semibold text-gray-300 uppercase mb-2 flex items-center">
                  <i class="fas fa-code mr-2"></i>
                  Skills
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(skill, index) in selectedCertificate.skills" 
                    :key="`skill-${index}`"
                    class="text-xs px-2 py-1 rounded-full bg-gray-800 text-yellow-400 border border-yellow-500 flex items-center"
                  >
                    <i class="fas fa-check-circle mr-1"></i>
                    {{ skill }}
                  </span>
                </div>
              </div>
              
              <div class="mt-6 space-y-2">
                <!-- Download button - hanya ditampilkan jika PDF tersedia -->
                <a 
                  v-if="isPdfAvailable"
                  :href="selectedCertificate.pdfUrl" 
                  download
                  class="w-full inline-block text-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-md text-sm font-medium hover:bg-yellow-400 transition-all items-center justify-center"
                >
                  <i class="fas fa-download mr-2"></i>
                  Download PDF
                </a>
                
                <!-- View button - hanya ditampilkan jika PDF tersedia -->
                <a 
                  v-if="isPdfAvailable"
                  :href="selectedCertificate.pdfUrl" 
                  target="_blank"
                  class="w-full inline-block text-center px-4 py-2 border border-yellow-500 text-yellow-400 rounded-md text-sm font-medium hover:bg-yellow-400 hover:text-gray-900 transition-all items-center justify-center"
                >
                  <i class="fas fa-external-link-alt mr-2"></i>
                  Buka di Tab Baru
                </a>
                
                <!-- Pesan alternatif jika PDF tidak tersedia -->
                <div 
                  v-if="!isPdfAvailable" 
                  class="p-4 bg-gray-800 rounded-md border border-gray-700"
                >
                  <div class="flex items-start">
                    <i class="fas fa-info-circle text-yellow-400 mt-1 mr-3"></i>
                    <div>
                      <p class="text-white text-sm font-medium mb-1">
                        File PDF tidak tersedia
                      </p>
                      <p class="text-gray-400 text-sm">
                        Silakan hubungi saya melalui kontak yang tersedia untuk mendapatkan bukti sertifikat ini.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
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