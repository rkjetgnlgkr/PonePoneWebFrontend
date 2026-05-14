<template>
  <section id="contact" class="section contact">
    <div class="container">
      <p class="section-subtitle" style="margin-bottom:8px">GET IN TOUCH</p>
      <h2 class="section-title">與我<span>聯繫</span></h2>
      <p class="section-subtitle">有任何合作機會或問題，歡迎直接聯繫我。</p>

      <div class="contact__grid">
        <!-- Contact Info -->
        <div class="contact__info">
          <div v-if="profile && profile.email" class="contact__card glass-card">
            <div class="contact__card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div class="contact__card-label">Email</div>
              <a :href="`mailto:${profile.email}`" class="contact__card-value">{{ profile.email }}</a>
            </div>
          </div>
          <div v-if="profile && profile.phone" class="contact__card glass-card">
            <div class="contact__card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.2 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <div class="contact__card-label">電話</div>
              <div class="contact__card-value">{{ profile.phone }}</div>
            </div>
          </div>
          <div v-if="profile && profile.location" class="contact__card glass-card">
            <div class="contact__card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div class="contact__card-label">所在地</div>
              <div class="contact__card-value">{{ profile.location }}</div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="contact__social" v-if="socialLinks.length">
            <div class="contact__social-title">找到我在</div>
            <div class="contact__social-list">
              <a v-for="link in filteredSocials" :key="link.id"
                 :href="link.url" target="_blank" rel="noopener"
                 class="contact__social-btn glass-card">
                <span v-html="getSocialIcon(link.platform)"></span>
                <span>{{ capitalize(link.platform) }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Message Placeholder -->
        <div class="contact__form-area glass-card">
          <h3 class="contact__form-title">傳送訊息</h3>
          <p class="contact__form-desc">功能開發中，如需聯繫請透過 Email 或社群媒體。</p>
          <div class="contact__form-illustration">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <a v-if="profile && profile.email" :href="`mailto:${profile.email}`" class="btn btn--primary" style="margin-top:24px">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            直接寄信
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="contact__footer">
      <div class="container">
        <p>© {{ year }} {{ displayName }}. Built with ❤️ &amp; Vue.js</p>
      </div>
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
      return this.profile?.nickname || this.profile?.username || 'Portfolio'
    },
    year() {
      return new Date().getFullYear()
    },
    filteredSocials() {
      return this.socialLinks.filter(l => l.platform !== 'resume')
    }
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getSocialIcon(platform) {
      const icons = {
        github:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
        linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
        twitter:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
        email:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
      }
      return icons[platform.toLowerCase()] || `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  padding-bottom: 0 !important;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 32px;
    margin-bottom: 80px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
  }

  &__card-icon {
    width: 44px; height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--color-primary) 10%, transparent);
    border-radius: 12px;
    color: var(--color-primary);
    flex-shrink: 0;
  }

  &__card-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 4px;
  }

  &__card-value {
    font-size: 0.9rem;
    color: var(--text-primary);
    font-weight: 500;
    transition: color 0.2s;

    &[href]:hover { color: var(--color-primary); }
  }

  &__social { margin-top: 8px; }

  &__social-title {
    font-size: 0.78rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  &__social-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__social-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.85rem;
    color: var(--text-secondary);
    transition: all 0.2s;

    &:hover {
      color: var(--text-primary);
      border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
    }
  }

  &__form-area {
    padding: 40px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 480px) {
      padding: 28px 20px;
    }
  }

  &__form-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
  }

  &__form-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.7;
  }

  &__form-illustration {
    color: var(--border-color);
    margin-top: 32px;
  }

  &__footer {
    padding: 28px 0;
    border-top: 1px solid var(--border-color);
    text-align: center;

    p {
      color: var(--text-muted);
      font-size: 0.82rem;
    }
  }
}
</style>
