<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled, 'navbar--open': menuOpen }">
    <div class="container navbar__inner">
      <!-- Logo -->
      <div class="navbar__brand" @click="scrollTo('hero')">
        <div class="navbar__avatar" v-if="profile && profile.avatar">
          <img :src="avatarUrl" :alt="displayName" />
        </div>
        <div class="navbar__avatar navbar__avatar--default" v-else>
          {{ initials }}
        </div>
        <span class="navbar__name">{{ displayName }}</span>
      </div>

      <!-- Desktop menu -->
      <ul class="navbar__links">
        <li v-for="item in navItems" :key="item.id">
          <a :href="`#${item.id}`" @click.prevent="scrollTo(item.id)"
             :class="{ active: activeSection === item.id }">
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Hire Me -->
      <button class="navbar__hire btn btn--primary" @click="$emit('hire-me')">
        Hire Me
      </button>

      <!-- Mobile hamburger -->
      <button class="navbar__hamburger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="navbar__mobile" :class="{ open: menuOpen }">
      <ul>
        <li v-for="item in navItems" :key="item.id">
          <a :href="`#${item.id}`" @click.prevent="scrollTo(item.id); menuOpen = false"
             :class="{ active: activeSection === item.id }">
            {{ item.label }}
          </a>
        </li>
        <li><button class="btn btn--primary" style="width:100%;justify-content:center" @click="$emit('hire-me')">Hire Me</button></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    profile: { type: Object, default: null }
  },
  data() {
    return {
      scrolled: false,
      menuOpen: false,
      activeSection: 'hero',
      navItems: [
        { id: 'about',      label: '關於我' },
        { id: 'portfolio',  label: '作品集' },
        { id: 'skills',     label: '專業技能' },
        { id: 'experience', label: '工作經歷' },
        { id: 'contact',    label: '聯絡方式' }
      ]
    }
  },
  computed: {
    displayName() {
      return this.profile?.nickname || this.profile?.username || 'Portfolio'
    },
    initials() {
      const name = this.displayName
      return name.slice(0, 2).toUpperCase()
    },
    avatarUrl() {
      if (!this.profile?.avatar) return ''
      if (this.profile.avatar.startsWith('http')) return this.profile.avatar
      return `${process.env.BACKEND_URL || ''}${this.profile.avatar}`
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.setupIntersection()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 50
    },
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    setupIntersection() {
      if (!('IntersectionObserver' in window)) return
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) this.activeSection = entry.target.id
        })
      }, { threshold: 0.4 })
      this.navItems.forEach(item => {
        const el = document.getElementById(item.id)
        if (el) observer.observe(el)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.3s ease;

  &--scrolled {
    padding: 12px 0;
    background: rgba(8, 11, 20, 0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
  }

  &__inner {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    flex-shrink: 0;
  }

  &__avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
    img { width: 100%; height: 100%; object-fit: cover; }

    &--default {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--gradient-primary);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  }

  &__name {
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-primary);
    letter-spacing: 0.2px;
  }

  &__links {
    display: flex;
    list-style: none;
    gap: 4px;
    margin-left: auto;

    li a {
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all 0.2s;
      display: block;

      &:hover, &.active {
        color: var(--text-primary);
        background: var(--bg-card-hover);
      }
    }

    @media (max-width: 768px) { display: none; }
  }

  &__hire {
    flex-shrink: 0;
    @media (max-width: 768px) { display: none; }
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;

    span {
      display: block;
      width: 24px; height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all 0.3s;
    }

    @media (max-width: 768px) { display: flex; }
  }

  &__mobile {
    display: none;
    padding: 0 24px 20px;
    background: rgba(8, 11, 20, 0.96);
    backdrop-filter: blur(20px);

    &.open { display: block; }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;

      li a {
        display: block;
        padding: 12px 16px;
        color: var(--text-secondary);
        font-size: 1rem;
        border-radius: 8px;
        transition: all 0.2s;

        &:hover, &.active {
          color: var(--text-primary);
          background: var(--bg-card-hover);
        }
      }
    }
  }
}
</style>
