<template>
  <section id="skills" class="section skills">
    <div class="container">
      <p class="section-subtitle" style="margin-bottom:8px">EXPERTISE</p>
      <h2 class="section-title">專業<span>技能</span></h2>
      <p class="section-subtitle">多年積累的技術棧，持續學習與精進中。</p>

      <div v-if="!Object.keys(grouped).length" class="skills__empty">
        <p>尚無技能資料</p>
      </div>

      <div class="skills__categories" v-else>
        <div v-for="(items, cat) in grouped" :key="cat" class="skills__category">
          <h3 class="skills__cat-title">{{ cat }}</h3>
          <div class="skills__grid">
            <div v-for="skill in items" :key="skill.id" class="skills__item glass-card">
              <div class="skills__item-top">
                <span class="skills__item-name">{{ skill.name }}</span>
                <span class="skills__item-level">{{ skill.level }}%</span>
              </div>
              <div class="skills__bar">
                <div class="skills__bar-fill"
                     :style="{ width: animated ? skill.level + '%' : '0%' }"
                     :class="getLevelClass(skill.level)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    skills: { type: Array, default: () => [] }
  },
  data() {
    return { animated: false }
  },
  computed: {
    grouped() {
      return this.skills.reduce((acc, s) => {
        const cat = s.category || '其他'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(s)
        return acc
      }, {})
    }
  },
  mounted() {
    if (!('IntersectionObserver' in window)) { this.animated = true; return }
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.animated = true
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(this.$el)
  },
  methods: {
    getLevelClass(level) {
      if (level >= 85) return 'skills__bar-fill--expert'
      if (level >= 70) return 'skills__bar-fill--good'
      return 'skills__bar-fill--learning'
    }
  }
}
</script>

<style lang="scss" scoped>
.skills {
  background: linear-gradient(180deg, transparent 0%, rgba(14,17,32,0.5) 50%, transparent 100%);

  &__empty {
    text-align: center;
    padding: 60px 0;
    color: var(--text-muted);
  }

  &__categories {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  &__cat-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding-left: 2px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  &__item {
    padding: 18px 20px;
  }

  &__item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &__item-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__item-level {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-family: 'Space Grotesk', sans-serif;
  }

  &__bar {
    height: 6px;
    background: var(--bg-card-hover);
    border-radius: 3px;
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);

    &--expert  { background: var(--gradient-primary); }
    &--good    { background: linear-gradient(90deg, #43e97b, #38f9d7); }
    &--learning { background: linear-gradient(90deg, #f093fb, #f5576c); }
  }
}
</style>
