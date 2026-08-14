<template>
  <header class="zy-site-header">
    <a class="zy-site-brand" :href="SITE_HOME_URL" target="_self" aria-label="知远智能体首页">
      <img :src="'/zhiyuan-logo.svg'" alt="知远" />
      <span>ZHIYUAN AGENT</span>
    </a>
    <nav class="zy-site-nav" aria-label="主站导航">
      <div class="zy-site-nav-track">
        <a
          v-for="item in SITE_NAVIGATION"
          :key="item.id"
          :href="item.href"
          :target="item.id === 'docs' ? undefined : '_self'"
          :aria-current="item.id === 'docs' ? 'page' : undefined"
        >
          {{ item.label }}
        </a>
        <a class="zy-site-enterprise" :href="SITE_ENTERPRISE_URL" target="_self">企业版</a>
      </div>
    </nav>
    <a
      class="zy-site-github"
      :href="SITE_GITHUB_URL"
      target="_blank"
      rel="noreferrer"
      aria-label="在 GitHub 查看知远智能体"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path :d="SITE_GITHUB_ICON_PATH" />
      </svg>
      <span>GitHub</span>
    </a>
  </header>
</template>

<script setup lang="ts">
import {
  SITE_ENTERPRISE_URL,
  SITE_GITHUB_ICON_PATH,
  SITE_GITHUB_URL,
  SITE_HOME_URL,
  SITE_NAVIGATION,
} from "../../../src/shared/site-navigation";
</script>
