<template>
  <section id="hero" class="hero">
    <div class="hero__glow hero__glow--1"></div>
    <div class="hero__glow hero__glow--2"></div>
    <div class="container hero__content">
      <div class="hero__text animate-fade-up">
        <p class="hero__greeting">Hello, I'm</p>
        <h1 class="hero__name">{{ displayName }}</h1>
        <h2 class="hero__title" v-if="profile && profile.title">{{ profile.title }}</h2>
        <p class="hero__bio" v-if="profile && profile.bio">{{ profile.bio }}</p>
        <div class="hero__location" v-if="profile && profile.location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {{ profile.location }}
        </div>
        <div class="hero__actions">
          <a href="#portfolio" @click.prevent="$emit('scroll-to', 'portfolio')" class="btn btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            查看作品集
          </a>
          <a href="#contact" @click.prevent="$emit('scroll-to', 'contact')" class="btn btn--outline">
            與我聯繫
          </a>
        </div>
        <div class="hero__social" v-if="socialLinks.length">
          <a v-for="link in socialLinks" :key="link.id"
             :href="link.url" target="_blank" rel="noopener"
             class="hero__social-link" :aria-label="link.platform">
            <span v-html="getSocialIcon(link.platform)"></span>
          </a>
        </div>
      </div>

      <div class="hero__visual animate-fade-up" style="animation-delay:0.2s">
        <div class="hero__avatar-ring">
          <div class="hero__avatar-ring__inner">
            <img v-if="profile && profile.avatar" :src="avatarUrl" :alt="displayName" />
            <div v-else class="hero__avatar-placeholder">
              {{ initials }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero__scroll-hint" @click="$emit('scroll-to', 'about')">
      <span>Scroll</span>
      <div class="hero__scroll-arrow"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    profile:     { type: Object, default: null },
    socialLinks: { type: Array,  default: () => [] }
  },
  computed: {
    displayName() {
      return this.profile?.nickname || this.profile?.username || '—'
    },
    initials() {
      return this.displayName.slice(0, 2).toUpperCase()
    },
    avatarUrl() {
      if (!this.profile?.avatar) return ''
      if (this.profile.avatar.startsWith('http')) return this.profile.avatar
      return `${process.env.BACKEND_URL || ''}${this.profile.avatar}`
    }
  },
  methods: {
    getSocialIcon(platform) {
      const icons = {
        github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
        linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
        twitter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
        email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
      }
      return icons[platform.toLowerCase()] || `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;

  &__glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;

    &--1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, transparent 70%);
      top: -100px; left: -100px;
    }
    &--2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
      bottom: -50px; right: -50px;
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: column-reverse;
      text-align: center;
      gap: 40px;
    }
  }

  &__text { flex: 1; max-width: 580px; }

  &__greeting {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  &__name {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    background: linear-gradient(135deg, var(--text-primary) 30%, var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
    line-height: 1.1;
  }

  &__title {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    color: var(--text-secondary);
    font-weight: 400;
    margin-bottom: 20px;
  }

  &__bio {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 16px;
    max-width: 520px;
  }

  &__location {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 32px;
  }

  &__actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 32px;

    @media (max-width: 768px) { justify-content: center; }
  }

  &__social {
    display: flex;
    gap: 12px;
    @media (max-width: 768px) { justify-content: center; }
  }

  &__social-link {
    width: 40px; height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--bg-card-hover);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-secondary);
    transition: all 0.3s;

    &:hover {
      color: var(--text-primary);
      background: color-mix(in srgb, var(--color-primary) 20%, transparent);
      border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
      transform: translateY(-3px);
    }
  }

  &__visual {
    flex-shrink: 0;
    @media (max-width: 768px) { order: -1; }
  }

  &__avatar-ring {
    width: 280px; height: 280px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, var(--color-primary), var(--color-secondary), #ff6b6b, var(--color-primary));
    padding: 3px;
    animation: float 4s ease-in-out infinite;
    box-shadow: 0 0 60px color-mix(in srgb, var(--color-primary) 25%, transparent);

    @media (max-width: 768px) {
      width: 200px; height: 200px;
    }

    &__inner {
      width: 100%; height: 100%;
      border-radius: 50%;
      overflow: hidden;
      background: var(--bg-surface);

      img {
        width: 100%; height: 100%;
        object-fit: cover;
      }
    }
  }

  &__avatar-placeholder {
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 30%, transparent), color-mix(in srgb, var(--color-secondary) 30%, transparent));
    font-size: 4rem;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    font-family: 'Space Grotesk', sans-serif;
  }

  &__scroll-hint {
    position: absolute;
    bottom: 32px; left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    z-index: 1;

    @media (max-width: 480px) { display: none; }
  }

  &__scroll-arrow {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--text-muted), transparent);
    animation: scrollPulse 1.5s ease-in-out infinite;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50%       { opacity: 1;   transform: scaleY(1.1); }
}
</style>
