<template>
  <section class="hero-section" v-motion-fade id="1">
    <a-row justify="center" align="center" class="hero-section-content">
      <a-col :span="16">
        <h1 class="hero-title" v-motion="heroTitleMotion">Code Star Labs - 码星Labs</h1>
        <p class="hero-subtitle" v-motion="heroSubtitleMotion">点亮青春，编程未来——筑梦科技星辰，用代码创造未来</p>
        <a-button type="outline" size="large" class="cta-button" v-motion-pop-visible-once @click="scrollTo('2')">
          加入我们
        </a-button>
      </a-col>
    </a-row>
  </section>

  <section class="about-section" ref="aboutSection" v-motion-slide-visible-once-bottom id="2">
    <a-row justify="center">
      <a-col :span="20">
        <a-card class="about-card" v-motion="cardMotion">
          <a-row :gutter="24" class="about-card-content">
            <a-col :span="8">
              <div class="icon-wrapper" v-motion="iconMotion">
                <img src="/about.svg" alt="About" width="300" height="300">
              </div>
            </a-col>
            <a-col :span="16">
              <h2 class="about-title" v-motion="titleMotion">关于 Code Star Labs</h2>
              <h1 class="about-text" v-motion="textMotion">{{ aboutText }}</h1>
              <a-button type="primary" shape="round" size="large" class="join-button" v-motion="buttonMotion" @click="about()">
                加入我们
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </section>

  <section class="vision-section" v-motion-fade id="3">
    <a-row justify="center" align="center" class="vision-section-content">
      <a-col :span="16" class="text-center">
        <h2 class="vision-title" v-motion="visionTitleMotion">我们虽是学生<br />但未来由我们创造</h2>
      </a-col>
    </a-row>
  </section>

  <section class="timeline-section" ref="timelineSection" v-motion-slide-visible-once-bottom id="4">
    <a-row justify="center">
      <a-col :span="24">
        <h2 class="section-title" v-motion="timelineTitleMotion">发展历程</h2>
        <div class="timeline-container" v-motion="timelineMotion">
          <a-timeline mode="alternate" :style="{ flex: 1 }">
            <a-timeline-item v-for="(item, index) in timelineItems" :key="index" :label="item.date" v-motion="getTimelineItemMotion(index)">
              {{ item.event }}
            </a-timeline-item>
          </a-timeline>
        </div>
      </a-col>
    </a-row>
  </section>

  <section class="collaboration-section vision-section-2" v-motion-fade id="5">
    <a-row justify="center" align="center" class="vision-section-content">
      <a-col :span="16" class="text-center">
        <h2 class="collaboration-title" v-motion="collaborationTitleMotion">我们在一起<br />共同发展</h2>
      </a-col>
    </a-row>
  </section>

  <section class="team-section" ref="teamSection" v-motion-slide-visible-once-bottom id="6">
    <a-row justify="center">
      <a-col :span="24">
        <h2 class="section-title" v-motion="teamTitleMotion">团队核心成员</h2>
        <a-row type="flex" justify="center" :gutter="[24, 24]">
          <a-col :xs="20" :sm="12" :md="8" :lg="6" v-for="(member, index) in teamMembers" :key="member.name">
            <a-card class="team-member-card" v-motion="getMemberCardMotion(index)">
              <a-col>
                <a-avatar :size="128" v-motion="getAvatarMotion(index)">
                  <img :src="member.avatar" />
                </a-avatar>
              </a-col>
              <a-col>
                <h3 class="member-name">{{ member.name }}</h3>
                <a-space>
                  <a-tag v-for="role in member.roles" :key="role" color="arcoblue" v-motion="getTagMotion(index)">{{ role }}</a-tag>
                </a-space>
              </a-col>
              <a-button type="outline" size="small" shape="round" class="mt-2"
                @click="github(member.GithubUrl)" v-motion="getButtonMotion(index)">查看更多</a-button>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import router from '../router';

interface TeamMember {
  name: string;
  avatar: string;
  roles: string[];
  GithubUrl: string;
}

const aboutText = `Code Star Labs（码星Labs或码星实验室）是一个高质量的在线编程团队。我们在这里一起学习和相互交流，以提升自己的各项技能。同时，我们都以编程为爱好，共同研究和讨论各种编程技术问题。目前我们已有30+的成员，且在各成员以及与其他团队的合作下开发出了一系列优质的产品。Code Star Labs 非常欢迎你的加入！`;

const teamMembers: TeamMember[] = [
  {
    name: 'CoderMeowHacker',
    avatar: 'https://avatars.githubusercontent.com/u/158447241?v=4',
    roles: ['创始人'],
    GithubUrl: 'https://github.com/codemiao08',
  },
  {
    name: 'Soul',
    avatar: 'https://avatars.githubusercontent.com/u/155857563?v=4',
    roles: ['前端UI', '管理员'],
    GithubUrl: 'https://github.com/SoulCodingYanhun',
  },
  {
    name: '广安',
    avatar: 'https://avatars.githubusercontent.com/u/110234072?v=4',
    roles: ['开发者'],
    GithubUrl: 'https://github.com/Guanganawa'
  }
];

const timelineItems = [
  { date: '2023-07-21', event: 'CodeStarLabs正式创立' },
  { date: '2023-08-07', event: 'CodeStarLabs正式上线' },
  { date: '', event: '敬请期待' },
];

const github = (url: string) => {
  location.href = url;
}

const about = () => {
  router.push('/about');
}

const currentSection = ref('2');

const scrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        currentSection.value = sectionId;
    }
};

// Refs for scroll-based animations
const aboutSection = ref(null)
const timelineSection = ref(null)
const teamSection = ref(null)

// Motion definitions with smoother transitions
const heroTitleMotion = {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const heroSubtitleMotion = {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 200 } },
}

const cardMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const iconMotion = {
  initial: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 200 } },
}

const titleMotion = {
  initial: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 300 } },
}

const textMotion = {
  initial: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 400 } },
}

const buttonMotion = {
  initial: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15, delay: 500 } },
}

const visionTitleMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const timelineTitleMotion = {
  initial: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const timelineMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 200 } },
}

const getTimelineItemMotion = (index: number) => ({
  initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 200 + index * 100 } },
})

const collaborationTitleMotion = {
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const teamTitleMotion = {
  initial: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const getMemberCardMotion = (index: number) => ({
  initial: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 100 * index } },
})

const getAvatarMotion = (index: number) => ({
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 200 + 100 * index } },
})

const getTagMotion = (index: number) => ({
  initial: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 300 + 100 * index } },
})

const getButtonMotion = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 400 + 100 * index } },
})

// Use the useMotion composable for scroll-based animations
useMotion(aboutSection, {
  initial: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
})

useMotion(timelineSection, {
  initial: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
})

useMotion(teamSection, {
  initial: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
})
</script>

<style scoped>
/* 全局样式 */
.code-star-labs {
  font-family: 'Source Han Sans', 'Helvetica Neue', Arial, sans-serif;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
}

/* 头部样式 */
.header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 1000;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-1);
  margin: 0;
  margin-left: 10px;
}

/* 英雄区域样式 */
.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/introduce.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  text-align: center;
}

.hero-section-content {
  padding: 30vh 0;
  backdrop-filter: blur(5px);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.cta-button {
  font-size: 1.2rem;
  padding: 20px 30px 20px 30px;
  border-color: #fff;
  color: #fff;
  border-radius: 5px;
}

/* 关于我们部分样式 */
.about-section {
  padding: 130px 0;
  background-color: var(--color-bg-2);
}

.about-card {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 22px;
}

.about-card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.about-title {
  font-size: 2rem;
  color: var(--color-text-1);
  margin-bottom: 20px;
  margin-top: 0;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-2);
  margin-bottom: 30px;
}

.join-button {
  font-size: 1.1rem;
  padding: 0 30px;
  height: 48px;
}

/* 愿景和合作部分样式 */
.vision-section,
.collaboration-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('/create.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  text-align: center;
}

.vision-section-2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('/development.png');
}

.vision-section-content {
  padding: 100px 0;
  backdrop-filter: blur(5px);
}

.vision-title,
.collaboration-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 发展历程部分样式 */
.timeline-section {
  padding: 80px 0;
  background-color: var(--color-bg-1);
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
  font-size: 2.5rem;
  color: var(--color-text-1);
  font-weight: bold;
}

.timeline-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 团队成员部分样式 */
.team-section {
  padding: 80px 0;
  background-color: var(--color-bg-2);
}

.team-member-card {
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.team-member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.member-name {
  font-size: 1.2rem;
  margin: 1rem 0;
  font-weight: bold;
}

/* 通用工具类 */
.mt-2 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .about-card .arco-row {
    flex-direction: column;
  }

  .icon-wrapper {
    margin-bottom: 30px;
  }

  .about-title {
    font-size: 2rem;
  }

  .about-text {
    font-size: 1rem;
  }

  .vision-title,
  .collaboration-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .team-member-card {
    margin-bottom: 20px;
  }
}
</style>