<template>
  <div class="app-container">
    <main>
      <section class="hero" v-motion-slide-visible-once-bottom>
        <div class="hero-content" v-motion="heroContentMotion">
          <h1 class="hero-title">创新编程工具</h1>
          <p class="hero-subtitle">为青少年打造的高质量编程学习和开发平台</p>
          <a-button type="primary" size="large" @click="scrollTo('about')" class="cta-button"
            v-motion="ctaButtonMotion">
            探索产品
            <template #icon><icon-right /></template>
          </a-button>
        </div>
        <div class="hero-image" v-motion="heroImageMotion">

        </div>
      </section>

      <section id="about" class="section" v-motion-slide-visible-once-bottom>
        <h2 class="section-title" v-motion="sectionTitleMotion">关于我们的产品</h2>
        <div class="section-content" v-motion="sectionContentMotion">
          <h3>
            Code Star Labs 致力于为青少年开发者提供最先进、最易用的编程工具。
            我们的产品涵盖了从入门学习到高级开发的各个阶段，旨在激发创造力、培养问题解决能力，
            并为未来的科技创新者铺平道路。
          </h3>
        </div>
      </section>

      <section id="features" class="section bg-gradient" v-motion-slide-visible-once-bottom>
        <h2 class="section-title" v-motion="sectionTitleMotion">产品特性</h2>
        <div class="feature-grid">
          <div v-for="(feature, index) in features" :key="feature.title" class="feature-item"
            v-motion="getFeatureItemMotion(index)">
            <div class="feature-icon-wrapper">
              <component :is="feature.icon" class="feature-icon" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <section id="products" class="section" v-motion-slide-visible-once-bottom>
        <h2 class="section-title" v-motion="sectionTitleMotion">我们的产品</h2>
        <div class="product-grid">
          <a-card v-for="(product, index) in products" :key="product.name" class="product-card"
            :bodyStyle="{ padding: '20px' }" v-motion="getProductCardMotion(index)">
            <template #cover>
              <div class="product-image-wrapper">
                <img :src="product.image" :alt="product.name" class="product-image" />
              </div>
            </template>
            <a-card-meta :title="product.name" :description="product.shortDescription" />
            <template #actions>
              <a-button type="primary" class="learn-more-btn" @click="url(product.url)">了解更多</a-button>
            </template>
          </a-card>
        </div>
      </section>

      <section id="contact" class="section bg-gradient" v-motion-slide-visible-once-bottom>
        <h2 class="section-title" v-motion="sectionTitleMotion">联系我们</h2>
        <a-card class="contact-card" v-motion="contactCardMotion">
          <p>对我们的产品感兴趣？想要了解更多信息？</p>
          <a-button type="primary" size="large" class="contact-button" v-motion="contactButtonMotion">
            联系我们
            <template #icon><icon-send /></template>
          </a-button>
        </a-card>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IconRight, IconCode, IconRobot, IconExperiment, IconThunderbolt, IconSafe, IconCloud, IconSend } from '@arco-design/web-vue/es/icon';

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  url: string;
}

const currentSection = ref('about');
const isScrolled = ref(false);

const products: Product[] = [
  { id: '1', name: 'Box3 Blockly 3.0', shortDescription: '最新版本的Blockly编程工具，带来更多创新功能', image: './screenshots/box3blockly3screenshot.png', url: 'https://codestarlabs.github.io/Box3-Blockly-3.0/' },
  { id: '2', name: 'BOX3 Blockly', shortDescription: '稳定可靠的Blockly编程工具，经典永不过时', image: './screenshots/box3blocklyscreenshot.png', url: 'https://codestarlabs.github.io/BOX3-Blockly/' },
];

const features = [
  { icon: IconCode, title: '可视化编程', description: '通过拖拽积木来编写代码，让编程更直观、更有趣。' },
  { icon: IconRobot, title: 'AI辅助', description: '内置AI助手，为青少年开发者提供实时编程建议和解答。' },
  { icon: IconExperiment, title: '实验性功能', description: '不断推出新特性，让用户始终站在技术前沿。' },
  { icon: IconThunderbolt, title: '高性能', description: '优化的性能，确保流畅的编程和运行体验。' },
  { icon: IconSafe, title: '安全可靠', description: '注重数据安全和隐私保护，为青少年提供安全的学习环境。' },
  { icon: IconCloud, title: '云端协作', description: '支持云端存储和实时协作，随时随地编程学习。' },
];

const scrollTo = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    currentSection.value = sectionId;
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;

  const sections = ['contact', 'products', 'features', 'about'];
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element && window.scrollY >= element.offsetTop - 100) {
      currentSection.value = section;
      break;
    }
  }
};

const url = (url: string) => {
  location.href = url;
}

// Motion definitions
const heroContentMotion = {
  initial: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 200 } },
}

const heroImageMotion = {
  initial: { opacity: 0, scale: 0.8 },
  enter: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 400 } },
}

const ctaButtonMotion = {
  initial: { opacity: 0, scale: 0.8 },
  enter: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15, delay: 600 } },
}

const sectionTitleMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const sectionContentMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 200 } },
}

const getFeatureItemMotion = (index: number) => ({
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 100 * index } },
})

const getProductCardMotion = (index: number) => ({
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 100 * index } },
})

const contactCardMotion = {
  initial: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const contactButtonMotion = {
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15, delay: 200 } },
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.app-container {
  font-family: 'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #333;
  line-height: 1.8;
  background-color: #ffffff;
}

.header {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  padding: 15px 5%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-scrolled {
  padding: 10px 5%;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4a90e2;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #4a90e2;
  transition: width 0.3s ease;
}

.nav a:hover::after,
.nav a.active::after {
  width: 100%;
}

.hero {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 165px 5%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 58px;
}

.hero-content {
  max-width: 50%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: #4a90e2;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #555;
}

.cta-button {
  background: #4a90e2;
  border: none;
  padding: 15px 35px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border-radius: 30px;
  color: white;
}

.cta-button:hover {
  background: #3a7bd5;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.floating-image {
  max-width: 45%;
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px) rotate(2deg);
  }

  100% {
    transform: translateY(0px);
  }
}

.section {
  padding: 100px 5%;
}

.section-title {
  font-size: 2.8rem;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #4a90e2;
  margin: 20px auto 0;
}

.bg-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.feature-item {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  text-align: center;
}

.feature-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.feature-icon-wrapper {
  background: #4a90e2;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon-wrapper {
  transform: scale(1.1);
}

.feature-icon {
  font-size: 2rem;
}

.feature-item h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-item p {
  color: #666;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.product-card {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  background: white;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.product-image-wrapper {
  overflow: hidden;
  height: 220px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.contact-card {
  background: white;
  border-radius: 15px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
}

.contact-button {
  background: #4a90e2;
  border: none;
  padding: 15px 35px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border-radius: 30px;
  margin-top: 1.5rem;
  color: white;
}

.contact-button:hover {
  background: #3a7bd5;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.footer {
  background: #f0f4f8;
  color: #333;
  text-align: center;
  padding: 30px 0;
}

@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 80px 5%;
  }

  .hero-content,
  .floating-image {
    max-width: 100%;
  }

  .floating-image {
    margin-top: 40px;
  }

  .feature-grid,
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    padding: 15px 5%;
  }

  .nav {
    margin-top: 15px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .feature-grid,
  .product-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 60px 5%;
  }
}
</style>