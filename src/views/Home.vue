<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import Hero from '../components/Hero.vue';
import AboutSection from '../components/AboutSection.vue';
import ContactSection from '../components/ContactSection.vue';
import FooterSection from '../components/FooterSection.vue';
import AOS from 'aos';

// Profile data
const profile = ref({
  greeting: 'Halo, Saya',
  name: 'Muhammad Marendra Anggit Bagaskara',
  title: 'IT Software',
  bio: 'Tentang Saya',
  description: 'Saya adalah pelajar di SMK NEGERI 1 Bantul yang sedang meniti jalan untuk menjadi seorang Software Engineer berpengalaman. Saya memiliki minat besar dalam merancang dan membangun pengalaman pengguna yang intuitif, fungsional, serta menarik. Terbiasa bekerja dalam tim, saya mampu menerjemahkan ide dan kebutuhan menjadi solusi digital yang efisien dan berdampak nyata. Saya terus belajar dan beradaptasi dengan perkembangan teknologi untuk menciptakan produk yang relevan dan berkualitas.',
  image: '../assets/Hero.png',
});

const scrollToContact = () => {
  const element = document.getElementById('kontak');
  if (element) {
    // Smooth scroll dengan behavior native atau library
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

onMounted(() => {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
});
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <!-- Navigation -->
    <header class="container mx-auto py-6 px-4">
      <Navbar @talk="scrollToContact" />
    </header>

    <!-- Hero Section -->
    <div data-aos="fade-up">
      <Hero :profile="profile" />
    </div>

    <!-- About Section dengan animasi fade dari kiri -->
    <div data-aos="fade-right" data-aos-delay="100">
      <AboutSection :profile="profile" />
    </div>

    <!-- Contact Section dengan animasi zoom in -->
    <div data-aos="zoom-in" data-aos-delay="200">
      <ContactSection />
    </div>

    <!-- Footer dengan fade up -->
    <div data-aos="fade-up" data-aos-delay="100">
      <FooterSection />
    </div>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>