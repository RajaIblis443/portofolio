import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/routes'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  duration: 800, 
  easing: 'ease-in-out',
  once: false,
  offset: 100, 
})

createApp(App).use(router).mount('#app')
