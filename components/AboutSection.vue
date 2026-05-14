<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about__grid">
        <div class="about__image-col">
          <div class="about__img-wrap">
            <img v-if="profile && profile.avatar" :src="avatarUrl" :alt="displayName" />
            <div v-else class="about__img-placeholder">{{ initials }}</div>
            <div class="about__img-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Available for work
            </div>
          </div>
          <div class="about__stats">
            <div class="about__stat glass-card" v-for="stat in stats" :key="stat.label">
              <div class="about__stat-value">{{ stat.value }}</div>
              <div class="about__stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="about__text-col">
          <p class="section-subtitle" style="margin-bottom:8px">ABOUT ME</p>
          <h2 class="section-title">
            熱情的<span>全端開發者</span>
          </h2>
          <div class="about__bio" v-if="profile && profile.bio">
            <p>{{ profile.bio }}</p>
          </div>
          <div class="about__info-list">
            <div class="about__info-item" v-if="profile && profile.location">
              <div class="about__info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span>{{ profile.location }}</span>
            </div>
            <div class="about__info-item" v-if="profile && profile.email">
              <div class="about__info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <span>{{ profile.email }}</span>
            </div>
            <div class="about__info-item" v-if="profile && profile.phone">
              <div class="about__info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.2 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <span>{{ profile.phone }}</span>
            </div>
          </div>
          <a v-if="resumeLink" :href="resumeLink" target="_blank" class="btn btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            下載履歷
          </a>
        </div>
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
      return this.profile?.nickname || this.profile?.username || '—'
    },
    initials() {
      return this.displayName.slice(0, 2).toUpperCase()
    },
    avatarUrl() {
      if (!this.profile?.avatar) return ''
      if (this.profile.avatar.startsWith('http')) return this.profile.avatar
      return `${process.env.BACKEND_URL || ''}${this.profile.avatar}`
    },
    resumeLink() {
      return this.socialLinks.find(l => l.platform === 'resume')?.url || null
    },
    stats() {
      return [
        { value: '3+', label: '年工作經驗' },
        { value: '10+', label: '完成專案' },
        { value: '5+', label: '技術棧' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 80px;
    align-items: start;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }

  &__image-col {
    position: sticky;
    top: 100px;
    @media (max-width: 900px) { position: static; }
  }

  &__img-wrap {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    aspect-ratio: 4/5;
    max-height: 400px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);

    img {
      width: 100%; height: 100%;
      object-fit: cover;
    }
  }

  &__img-placeholder {
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-secondary) 20%, transparent));
    font-size: 6rem;
    font-weight: 700;
    color: rgba(255,255,255,0.3);
    font-family: 'Space Grotesk', sans-serif;
  }

  &__img-badge {
    position: absolute;
    bottom: 16px; left: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(8, 11, 20, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 50px;
    border: 1px solid rgba(67, 233, 123, 0.3);
    font-size: 0.8rem;
    color: #43e97b;
    font-weight: 600;

    svg { color: #43e97b; }
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 16px;
  }

  &__stat {
    text-align: center;
    padding: 16px 8px;
  }

  &__stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
    font-family: 'Space Grotesk', sans-serif;
  }

  &__stat-label {
    font-size: 0.72rem;
    color: var(--text-muted);
    margin-top: 4px;
  }

  &__bio {
    margin: 24px 0;
    p {
      color: var(--text-secondary);
      line-height: 1.9;
      font-size: 1rem;
    }
  }

  &__info-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
  }

  &__info-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  &__info-icon {
    width: 32px; height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--color-primary) 10%, transparent);
    border-radius: 8px;
    color: var(--color-primary);
    flex-shrink: 0;
  }
}
</style>
