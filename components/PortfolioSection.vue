<template>
  <section id="portfolio" class="section portfolio">
    <div class="container">
      <p class="section-subtitle" style="margin-bottom:8px">MY WORK</p>
      <h2 class="section-title">精選<span>作品集</span></h2>
      <p class="section-subtitle">以下是我完成的一些專案，每個作品都傾注了對技術與設計的熱情。</p>

      <div v-if="portfolios.length === 0" class="portfolio__empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
        <p>尚無作品</p>
      </div>

      <div class="portfolio__grid" v-else>
        <div v-for="item in portfolios" :key="item.id" class="portfolio__card glass-card">
          <div class="portfolio__img">
            <img v-if="item.images && item.images.length"
                 :src="getImageUrl(item.images[0].image_path)"
                 :alt="item.name" />
            <div v-else class="portfolio__img-placeholder">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <div class="portfolio__img-overlay">
              <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="btn btn--primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                查看專案
              </a>
            </div>
          </div>
          <div class="portfolio__info">
            <h3 class="portfolio__name">{{ item.name }}</h3>
            <p class="portfolio__desc" v-if="item.description">{{ item.description }}</p>
            <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="portfolio__link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              前往連結
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    portfolios: { type: Array, default: () => [] }
  },
  methods: {
    getImageUrl(path) {
      if (!path) return ''
      if (path.startsWith('http')) return path
      return `${process.env.BACKEND_URL || 'http://localhost:8080'}${path}`
    }
  }
}
</script>

<style lang="scss" scoped>
.portfolio {
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 80px 0;
    color: var(--text-muted);
    font-size: 1rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    overflow: hidden;
    cursor: default;
  }

  &__img {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    background: var(--bg-card);

    img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &__img-placeholder {
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, transparent), color-mix(in srgb, var(--color-secondary) 8%, transparent));
    color: var(--text-muted);
  }

  &__img-overlay {
    position: absolute;
    inset: 0;
    background: rgba(8, 11, 20, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &__card:hover &__img img { transform: scale(1.06); }
  &__card:hover &__img-overlay { opacity: 1; }

  &__info {
    padding: 20px 22px 22px;
  }

  &__name {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: 600;
    transition: gap 0.2s;

    &:hover { gap: 10px; }
  }
}
</style>
