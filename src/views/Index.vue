<template>
  <a-drawer class="drawer-box" arco-theme="dark" :width="340" :visible="visible" @ok="handleOk" :footer="false"
    @cancel="handleCancel" unmountOnClose>
    <template #title>
    </template>
    <div style="margin: -12px -16px;">
      <a-space direction="vertical" class="drawer-content">
        <div v-for="item in navItems" style="margin-bottom: -8px;">
          <a-button class="drawer-content-link" long :key="item.name" @click="Links(item.name); handleCancel();">
            <div>{{ item.label }}</div>

          </a-button>
          <div style="padding: 0 20px;"><a-divider class="half-divider" style="margin-bottom: 0; margin-top: 7px;" />
          </div>
        </div>
      </a-space>
    </div>
  </a-drawer>
  <a-layout class="code-star-labs">
    <a-layout-header class="header">
      <a-row align="center" justify="space-between">
        <a-col :span="100">
          <div class="logo-container" @click="home">
            <div class="header-logo"></div>
            <div class="header-title">CodeStarLabs</div>
          </div>
        </a-col>
        <a-col :span="8" class="header-pc">
          <a-menu mode="horizontal" :selected-keys="[activeIndex]" @menu-item-click="handleMenuClick">
            <a-menu-item v-for="item in navItems" :key="item.name" @click="Links(item.name)">
              {{ item.label }}
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="4" class="header-pc">
          <a-button type="primary" shape="round" @click="Login">登录/注册</a-button>
        </a-col>
        <a-col :span="2" class="header-mobile">
          <a-button size="large" shape="round" class="drawer-button" @click="drawerHandleClick">
            <template #icon><icon-menu-fold /></template>
          </a-button>
        </a-col>
      </a-row>
    </a-layout-header>

    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>

    <a-layout-footer class="footer">
      <a-row justify="space-between">
        <a-col :span="8">
          <div class="logo-container">
            <a-row>
              <a-col style="padding-left: 7px;">
                <a-image src="./codestarlabs.svg" :width="60" :height="60" />
              </a-col>
              <a-col>
                <h1 class="logo-title">Code Star Labs-码星Labs</h1>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="4" class="footer-options">
          <h3>关于我们</h3>
          <a-space direction="vertical">
            <a-link v-for="item in aboutItems" :key="item.key" @click="scrollToSectiona(item.key)">
              {{ item.label }}
            </a-link>
          </a-space>
        </a-col>
        <a-col :span="4" class="footer-options">
          <h3>产品</h3>
          <a-space direction="vertical">
            <a-link v-for="item in productItems" :key="item.key" @click="handleClick(item.key)">
              {{ item.label }}
            </a-link>
          </a-space>
        </a-col>
        <a-col :span="4" class="footer-options">
          <h3>服务</h3>
          <a-space direction="vertical">
            <a-link v-for="item in serviceItems" :key="item.key" @click="scrollToSection(item.key)">
              {{ item.label }}
            </a-link>
          </a-space>
        </a-col>
        <a-col :span="4" class="footer-options">
          <h3>友情链接</h3>
          <a-space direction="vertical">
            <a-link v-for="item in friendLinkItems" :key="item.key" @click="handleClick(item.key)">
              {{ item.label }}
            </a-link>
          </a-space>
        </a-col>
      </a-row>
      <a-divider />
      <a-typography-text class="copyright">Copyright © 2023 - {{ currentYear }} Code Star Labs</a-typography-text>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const currentYear = new Date().getFullYear();
const router = useRouter();
const visible = ref(false);

const drawerHandleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}

interface NavItem {
  name: string;
  label: string;
}

const activeIndex = ref('/');
const navItems: NavItem[] = [
  { name: '/', label: '首页' },
  { name: '/products', label: '产品' },
  { name: '/services', label: '服务' },
  { name: '/about', label: '关于我们' }
];

const Links = (key: string) => {
  const item = navItems.find((i) => i.name === key);
  if (item) {
    activeIndex.value = item.name;
    router.push(item.name);
  }
}

interface FooterItem {
  key: string;
  label: string;
}

const aboutItems: FooterItem[] = [
  { key: 'about', label: '团队介绍' },
  { key: '', label: '加入我们' },
  { key: 'sponsor-us', label: '赞助我们' }
];

const productItems: FooterItem[] = [
  { key: 'https://codestarlabs.github.io/Box3-Blockly-3.0/', label: 'Box3 Blockly3.0' },
  { key: 'https://box3.codestarlabs.top/BOX3-Blockly/', label: 'Box3 Blockly' },
];

const serviceItems: FooterItem[] = [
  { key: 'service1', label: '服务1' },
  { key: 'service2', label: '服务2' },
  { key: 'service3', label: '服务3' }
];

const friendLinkItems: FooterItem[] = [
  { key: 'https://cdstar.top/', label: 'Code Dream Star' },
  { key: 'https://ducksite.cloudroo.top/', label: 'DuckSite' }
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToSectiona = (key: string) => {
  if (key === 'about') {
    router.push('/about');
    scrollToSection('about');
    window.scrollTo({ top: 30, behavior: 'smooth' });
  }
}

const handleClick = (key: string) => {
  window.location.href = key;
};

const handleMenuClick = (key: string) => {
  Links(key);
};

const Login = () => {
  router.push('/login');
}

const home = () => {
  activeIndex.value = '/';
  router.push('/');
};

onMounted(() => {
  setActiveIndex(router.currentRoute.value.path);
});

watch(() => router.currentRoute.value.path, (newPath) => {
  setActiveIndex(newPath);
});

const setActiveIndex = (path: string) => {
  const item = navItems.find((i) => i.name === path);
  if (item) {
    activeIndex.value = item.name;
  } else {
    activeIndex.value = '/';
  }
};
</script>

<style scoped>
/* 全局样式 */
.code-star-labs {
  font-family: 'Source Han Sans', 'Helvetica Neue', Arial, sans-serif;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
  overflow-x: hidden;
}

/* 头部样式 */
.header {
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-mobile {
  display: none;
}

.drawer-content-link {
  margin: 0;
  padding: 26px;
  font-size: 11pt;
  margin-bottom: -8px;
  background-color: #fff;
}

.drawer-button {
  background-color: #fff;
  font-size: 15pt;
  padding: 5px;
}

.drawer-content {
  width: 100%;
}

.header-logo {
  background: url("/codestarlabs.svg");
  height: 48px;
  width: 48px;
  background-size: cover;
  margin: 5px;
  margin-right: 10px;
}

.header-title {
  font-size: 17pt;
  font-weight: 600;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

/* 菜单样式 */
:deep(.arco-menu) {
  background-color: white;
}

:deep(.arco-menu-item) {
  color: var(--color-text-1);
}

:deep(.arco-menu-item:hover),
:deep(.arco-menu-item.arco-menu-selected) {
  color: var(--color-primary);
  background-color: var(--color-fill-2);
}

.logo-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding-left: 20px;
}

.logo-title {
  font-size: 25pt;
  font-weight: bold;
  color: var(--color-text-1);
  margin: 0;
  margin-left: 10px;
}

/* 页脚样式 */
.footer {
  background-color: #fafafa;
  padding: 40px 0 20px;
  border-top: 1px solid #efefef;
}

.footer .logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.footer-options {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.footer .logo-title {
  font-size: 25px;
  font-weight: bold;
  color: var(--color-text-1);
  margin: 0 0 0 10px;
}

.footer h3 {
  font-size: 16px;
  margin-bottom: 10px;
  padding-left: 3.5px;
}

.footer :deep(.arco-typography) {
  margin-bottom: 5px;
}

.footer :deep(.arco-space-vertical) {
  width: 100%;
}

.copyright {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #999;
}

:deep(.arco-link) {
  color: #333;
}

:deep(.arco-divider) {
  margin: 24px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .arco-menu-horizontal .arco-menu-inner {
    padding: 10px 15px;
  }

  .header {
    padding: 0 5px;
  }

  .header-title {
    font-size: 15pt;
  }

  .header-logo {
    height: 43px;
    width: 43px;
    margin-right: 10px;
  }

  .logo-container {
    padding-left: 10px;
  }

  .logo-title {
    font-size: 1.2rem;
  }

  :deep(.arco-menu) {
    font-size: 14px;
  }

  .footer {
    padding: 20px;
  }

  .footer .logo-title {
    font-size: 18px;
  }

  .footer h3 {
    font-size: 14px;
  }

  .copyright {
    font-size: 12px;
  }

  .header-pc {
    display: none;
  }

  .header-mobile {
    display: block;
  }
}
</style>