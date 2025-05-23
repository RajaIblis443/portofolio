<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="container mx-auto px-4 py-8 border-t border-gray-800">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="text-sm text-gray-500">
        &copy; {{ currentYear }} Hak Cipta Dilindungi.
      </div>
      <div class="flex space-x-6 mt-4 md:mt-0">
        <a href="#" class="text-gray-500 hover:text-white">Dribble</a>
        <a href="#" class="text-gray-500 hover:text-white">Instagram</a>
        <a href="#" class="text-gray-500 hover:text-white">Twitter</a>
      </div>
    </div>
  </footer>
</template>