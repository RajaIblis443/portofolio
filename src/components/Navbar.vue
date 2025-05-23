<script setup lang="ts">
import { ref } from 'vue';

// Navigation links
const menuLinks = ref([
  { name: 'TENTANG', href: '#tentang' },
  { name: 'LAYANAN', href: '#layanan' },
  { name: 'KONTAK', href: '#kontak' },
]);

const emit = defineEmits(['talk']);
</script>

<template>
  <nav class="flex justify-between items-center">
    <ul class="hidden md:flex space-x-8">
      <li v-for="(link, index) in menuLinks" :key="index">
        <a :href="link.href" class="text-xs uppercase hover:text-yellow-400 transition">{{ link.name }}</a>
      </li>
    </ul>
  </nav>
</template>