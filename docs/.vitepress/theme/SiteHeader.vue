<template>
  <header ref="header" class="zy-site-header" @keydown.esc="closeMenu">
    <a class="zy-site-brand" :href="SITE_HOME_URL" target="_self" aria-label="知远首页">
      <span>知远</span><small>ZHIYUAN</small>
    </a>
    <nav
      id="docs-site-navigation"
      class="zy-site-nav"
      :class="{ 'is-open': open }"
      aria-label="主站导航"
    >
      <a
        v-for="item in SITE_NAVIGATION"
        :key="item.id"
        :href="item.href"
        :target="item.id === 'docs' ? undefined : '_self'"
        :aria-current="item.id === 'docs' ? 'page' : undefined"
        @click="open = false"
        >{{ item.label }}</a
      >
    </nav>
    <div class="zy-header-actions">
      <a href="/#download" target="_self" class="zy-site-download"
        >下载
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12 12 4M5 4h7v7" />
        </svg>
      </a>
      <button
        ref="toggle"
        class="zy-menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="docs-site-navigation"
        :aria-label="open ? '关闭主站导航' : '打开主站导航'"
        @click="open = !open"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path
            :d="open ? 'm6 6 12 12M6 18 18 6' : 'M4 6h16M4 12h16M4 18h16'"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  SITE_HOME_URL,
  SITE_NAVIGATION,
} from "../../../src/shared/site-navigation";
const open = ref(false);
const header = ref<HTMLElement | null>(null);
const toggle = ref<HTMLButtonElement | null>(null);
function closeMenu() {
  open.value = false;
  toggle.value?.focus();
}
function outside(event: PointerEvent) {
  if (event.target instanceof Node && !header.value?.contains(event.target))
    open.value = false;
}
function focusLeft(event: FocusEvent) {
  if (
    event.relatedTarget instanceof Node &&
    !header.value?.contains(event.relatedTarget)
  )
    open.value = false;
}
let desktop: MediaQueryList | undefined;
function resize() {
  if (desktop?.matches) open.value = false;
}
onMounted(() => {
  window.addEventListener("pointerdown", outside);
  header.value?.addEventListener("focusout", focusLeft);
  desktop = window.matchMedia("(min-width: 701px)");
  desktop.addEventListener("change", resize);
});
onUnmounted(() => {
  window.removeEventListener("pointerdown", outside);
  header.value?.removeEventListener("focusout", focusLeft);
  desktop?.removeEventListener("change", resize);
});
</script>
