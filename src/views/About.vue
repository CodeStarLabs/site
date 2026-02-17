<template>
    <div class="app-container">
        <main>
            <section class="hero" v-motion-slide-visible-once-bottom>
                <div v-motion="heroContentMotion" class="hero-content">
                    <h1 class="hero-title">Code Star Labs</h1>
                    <p class="hero-subtitle">高质量的在线编程团队</p>
                    <a-button type="primary" size="large" @click="scrollTo('about')" class="cta-button">
                        了解更多
                        <template #icon><icon-right /></template>
                    </a-button>
                </div>
                <div v-motion :initial="{ opacity: 0, x: 100 }" :enter="{ opacity: 1, x: 0 }" class="hero-image">

                </div>
            </section>

            <section id="about" class="section" v-motion-slide-visible-once-bottom>
                <h2 v-motion="sectionTitleMotion" class="section-title">关于我们
                </h2>
                <div v-motion="sectionContentMotion" class="section-content">
                    <p>
                        Code Star
                        Labs（码星Labs或码星实验室）是一个高质量的在线编程团队。我们在这里一起学习和相互交流，以提升自己的各项技能。同时，我们都以编程为爱好，共同研究和讨论各种编程技术问题。目前我们已有30+的成员，且在各成员以及与其他团队的合作下开发出了一系列优质的产品。Code
                        Star Labs 非常欢迎你的加入！
                    </p>
                </div>
            </section>

            <section id="features" class="section"  v-motion-slide-visible-once-bottom>
                <h2 v-motion="sectionTitleMotion" class="section-title">我们的特色
                </h2>
                <div class="feature-grid">
                    <div v-for="(feature, index) in features" :key="feature.title" v-motion="getFeatureItemMotion(index)" class="feature-item">
                        <component :is="feature.icon" class="feature-icon" />
                        <h3>{{ feature.title }}</h3>
                        <p>{{ feature.description }}</p>
                    </div>
                </div>
            </section>

            <section id="team" class="section" v-motion-slide-visible-once-bottom>
                <h2 v-motion="sectionTitleMotion" class="section-title">团队核心成员
                </h2>
                <div class="team-grid">
                    <a-card v-for="(member, index) in teamMembers" :key="member.name" v-motion="getProductCardMotion(index)" class="team-member-card">
                        <template #cover>
                            <a-avatar :size="240" class="member-avatar">
                                <img :src="member.avatar" :alt="member.name" />
                            </a-avatar>
                        </template>
                        <a-card-meta :title="member.name" :description="member.position" />
                        <template #actions>
                            <a-button type="primary" class="view-more-btn"
                                @click="github(member.GithubUrl)">查看更多</a-button>
                        </template>
                    </a-card>
                </div>
            </section>

            <section id="contact" class="section" v-motion-slide-visible-once-bottom>
                <h2 v-motion="sectionTitleMotion" class="section-title">加入我们
                </h2>
                <a-card v-motion="contactCardMotion"
                    class="contact-card">
                    <p>我们欢迎热爱编程的青少年加入 Code Star Labs！</p>
                    <a-button type="primary" size="large" class="join-button" v-motion="contactButtonMotion">
                        立即加入
                        <template #icon><icon-right /></template>
                    </a-button>
                </a-card>
            </section>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IconRight, IconCode, IconUserGroup, IconExperiment, IconFire, IconBulb, IconSend } from '@arco-design/web-vue/es/icon';

interface TeamMember {
    name: string;
    position: string;
    avatar: string;
    GithubUrl: string;
}

const currentSection = ref('about');
const isScrolled = ref(false);

const teamMembers: TeamMember[] = [
    { name: 'CoderMeowHacker', position: '创始人', avatar: 'https://avatars.githubusercontent.com/u/158447241?v=4', GithubUrl: 'https://github.com/codemiao08' },
    { name: 'Soul', position: '前端UI & 管理员', avatar: 'https://avatars.githubusercontent.com/u/155857563?v=4', GithubUrl: 'https://github.com/SoulCodingYanhun' },
    { name: '广安', position: '开发者', avatar: 'https://avatars.githubusercontent.com/u/110234072?v=4', GithubUrl: 'https://github.com/Guanganawa'}
];

const features = [
    { icon: IconCode, title: '技能提升', description: '通过互相学习和交流，不断提升编程技能。' },
    { icon: IconUserGroup, title: '团队合作', description: '与其他成员合作，开发高质量的项目和产品。' },
    { icon: IconExperiment, title: '创新实践', description: '探索和实践各种新兴的编程技术。' },
    { icon: IconFire, title: '职业发展', description: '为未来的职业发展打下坚实的基础。' },
    { icon: IconBulb, title: '创意激发', description: '在充满活力的环境中激发创新思维和独特想法。' },
    { icon: IconSend, title: '项目孵化', description: '将创意转化为实际项目，并获得团队支持和指导。' },
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

    // Update current section based on scroll position
    const sections = ['contact', 'team', 'features', 'about'];
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
            currentSection.value = section;
            break;
        }
    }
};

const github = (url: string) => {
    location.href = url;
}

const heroContentMotion = {
  initial: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 200 } },
}

const sectionContentMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 200 } },
}

const sectionTitleMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
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
    background-color: #ffffff;
    color: #333333;
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s ease;
}

.header-scrolled {
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
}

.logo-image {
    width: 40px;
    height: 40px;
}

.company-name {
    font-weight: 700;
    margin-left: 0.5rem;
    color: #1e90ff;
    font-size: 1.2rem;
}

.nav a {
    color: #555555;
    text-decoration: none;
    margin-left: 1.5rem;
    transition: color 0.3s ease;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
}

.nav a:hover,
.nav a.active {
    color: #1e90ff;
}

.hero {
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
    background: linear-gradient(135deg, #f0f8ff, #e6f2ff);
}

.hero-content {
    max-width: 600px;
}

.hero-title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    color: #1e90ff;
}

.hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #555555;
}

.cta-button {
    background-color: #1e90ff;
    color: #ffffff;
    border: none;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cta-button:hover {
    background-color: #1873cc;
    transform: translateY(-2px);
}

.section {
    padding: 6rem 10%;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #333333;
    text-align: center;
}

.section-content {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555555;
    max-width: 800px;
    margin: 0 auto;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.feature-item {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
    font-size: 2.5rem;
    color: #1e90ff;
    margin-bottom: 1rem;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    justify-items: center;
}

.team-member-card {
    width: 240px;
    overflow: hidden;
    transition: all 0.3s ease;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
}

.team-member-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.member-avatar {
    width: 100%;
    height: 200px;
    object-fit: cover;
    padding: 15px;
    background: transparent;
}

.contact-card {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    background-color: #f7f7f7;
    border: 1px solid #e0e0e0;
    text-align: center;
}

.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.join-button {
    margin-top: 1rem;
    background-color: #1e90ff;
    color: #ffffff;
    border: none;
}

.join-button:hover {
    background-color: #1873cc;
}

.footer {
    text-align: center;
    padding: 2rem;
    background-color: #f0f0f0;
    color: #555555;
}

@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        text-align: center;
        padding: 150px 5%;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .feature-grid {
        grid-template-columns: 1fr;
    }

    .team-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .header {
        flex-direction: column;
        padding: 1rem;
    }

    .nav {
        margin-top: 1rem;
    }

    .nav a {
        margin-left: 0;
        margin-right: 1rem;
    }
}
</style>