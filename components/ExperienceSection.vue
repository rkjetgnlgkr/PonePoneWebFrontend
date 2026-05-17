<template>
  <section id="experience" class="section experience">
    <div class="container">
      <p class="section-subtitle" style="margin-bottom:8px">CAREER</p>
      <h2 class="section-title">工作<span>經歷</span></h2>
      <p class="section-subtitle">每一段工作都是成長的里程碑。</p>

      <div v-if="!experiences.length" class="experience__empty">
        <p>尚無工作經歷資料</p>
      </div>

      <div class="experience__timeline" v-else>
        <div v-for="(exp, i) in experiences" :key="exp.id"
             class="experience__item"
             :class="{ 'experience__item--left': i % 2 === 0, 'experience__item--right': i % 2 !== 0 }">
          <div class="experience__dot">
            <div class="experience__dot-inner" :class="{ active: exp.is_current }"></div>
          </div>
          <div class="experience__card glass-card">
            <div class="experience__header">
              <div>
                <h3 class="experience__position">{{ exp.position }}</h3>
                <div class="experience__company">{{ exp.company }}</div>
              </div>
              <div class="experience__badge" :class="{ current: exp.is_current }">
                {{ exp.is_current ? '在職中' : formatPeriod(exp.start_date, exp.end_date) }}
              </div>
            </div>
            <div class="experience__period" v-if="!exp.is_current">
              {{ formatDate(exp.start_date) }} — {{ formatDate(exp.end_date) }}
            </div>
            <div class="experience__period" v-else>
              {{ formatDate(exp.start_date) }} — 至今
            </div>
            <p class="experience__desc" v-if="exp.description">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    experiences: { type: Array, default: () => [] }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`
    },
    formatPeriod(start, end) {
      if (!start || !end) return ''
      const s = new Date(start), e = new Date(end)
      const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
      if (months < 12) return `${months} 個月`
      const y = Math.floor(months / 12), m = months % 12
      return m ? `${y} 年 ${m} 個月` : `${y} 年`
    }
  }
}
</script>

<style lang="scss" scoped>
.experience {
  &__empty {
    text-align: center;
    padding: 60px 0;
    color: var(--text-muted);
  }

  &__timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-primary) 30%, transparent), transparent);
      transform: translateX(-50%);

      @media (max-width: 700px) {
        left: 16px;
      }
    }
  }

  &__item {
    display: flex;
    gap: 32px;
    margin-bottom: 40px;
    position: relative;

    &--left  { flex-direction: row; }
    &--right { flex-direction: row-reverse; }

    @media (max-width: 700px) {
      flex-direction: row !important;
      padding-left: 44px;
    }

    .experience__card { flex: 1; }
  }

  &__dot {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    z-index: 1;

    @media (max-width: 700px) {
      left: 16px;
      transform: none;
    }
  }

  &__dot-inner {
    width: 14px; height: 14px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-primary) 30%, transparent);
    border: 2px solid var(--color-primary);
    transition: all 0.3s;

    &.active {
      background: var(--color-primary);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 20%, transparent);
    }
  }

  &__card {
    padding: 22px 24px;
    max-width: calc(50% - 28px);

    @media (max-width: 700px) {
      max-width: 100%;
    }
  }

  &__item--left  .experience__card { margin-right: auto; }
  &__item--right .experience__card { margin-left: auto; }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  &__position {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  &__company {
    font-size: 0.85rem;
    color: var(--color-primary);
    font-weight: 600;
  }

  &__badge {
    padding: 3px 10px;
    border-radius: 50px;
    font-size: 0.72rem;
    font-weight: 600;
    background: var(--bg-card-hover);
    color: var(--text-secondary);
    white-space: nowrap;
    flex-shrink: 0;

    &.current {
      background: rgba(67, 233, 123, 0.12);
      color: #43e97b;
    }
  }

  &__period {
    font-size: 0.78rem;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  &__desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.7;
    white-space: pre-wrap;
  }
}
</style>
