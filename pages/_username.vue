<template>
  <div class="page-wrapper">
    <!-- Loading -->
    <div v-if="loading" class="page-loading">
      <div class="page-loading__spinner"></div>
      <p>載入中...</p>
    </div>

    <!-- Error / 404 -->
    <div v-else-if="error" class="page-error">
      <div class="page-error__code">404</div>
      <h1>找不到使用者</h1>
      <p>「{{ $route.params.username }}」不存在或資料尚未建立。</p>
    </div>

    <!-- Main content -->
    <template v-else>
      <NavBar :profile="profile" @hire-me="hireMeVisible = true" />

      <HeroSection
        :profile="profile"
        :social-links="socialLinks"
        @scroll-to="scrollTo"
      />

      <AboutSection :profile="profile" :social-links="socialLinks" />

      <PortfolioSection :portfolios="portfolios" />

      <SkillsSection :skills="skills" />

      <ExperienceSection :experiences="experiences" />

      <ContactSection :profile="profile" :social-links="socialLinks" />
    </template>

    <!-- Hire Me dialog (placeholder) -->
    <el-dialog
      title="聯繫我"
      :visible.sync="hireMeVisible"
      width="400px"
      custom-class="hire-dialog">
      <p style="color:#9a9ab0;line-height:1.8">
        感謝您的興趣！<br/>
        請透過以下方式聯繫：<br/>
        <strong style="color:#f0f0f8">{{ profile && profile.email }}</strong>
      </p>
      <span slot="footer">
        <el-button type="primary" @click="hireMeVisible = false">確認</el-button>
      </span>
    </el-dialog>

    <!-- Back to top -->
    <transition name="fade">
      <button v-show="showTop" class="back-to-top" @click="scrollTo('hero')" aria-label="回到頂端">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
    </transition>
  </div>
</template>

<script>
import NavBar           from '@/components/NavBar'
import HeroSection      from '@/components/HeroSection'
import AboutSection     from '@/components/AboutSection'
import PortfolioSection from '@/components/PortfolioSection'
import SkillsSection    from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ContactSection   from '@/components/ContactSection'

export default {
  components: {
    NavBar, HeroSection, AboutSection,
    PortfolioSection, SkillsSection,
    ExperienceSection, ContactSection
  },

  head() {
    const name = this.profile?.nickname || this.profile?.username || this.$route.params.username
    const title = this.profile?.title || 'Portfolio'
    return {
      title: `${name} | ${title}`,
      meta: [
        { hid: 'description', name: 'description', content: this.profile?.bio || `${name}'s personal portfolio` }
      ]
    }
  },

  data() {
    return {
      hireMeVisible: false,
      showTop: false
    }
  },

  computed: {
    loading()     { return this.$store.state.loading },
    error()       { return this.$store.state.error },
    profile()     { return this.$store.state.profile },
    portfolios()  { return this.$store.state.portfolios },
    skills()      { return this.$store.state.skills },
    experiences() { return this.$store.state.experiences },
    socialLinks() { return this.$store.state.socialLinks },
    themeStyle()  { return this.$store.state.themeStyle || 'dark_star' }
  },

  async created() {
    await this.$store.dispatch('fetchProfile', {
      $axios: this.$axios,
      username: this.$route.params.username
    })
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    onScroll() {
      this.showTop = window.scrollY > 400
    }
  }
}
</script>

<style lang="scss">
.page-wrapper {
  position: relative;
  z-index: 1;
}

// Loading
.page-loading {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--text-muted);

  &__spinner {
    width: 44px; height: 44px;
    border: 3px solid rgba(0,0,0,0.08);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

// Error
.page-error {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;

  &__code {
    font-size: 7rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 16px;
    font-family: var(--font-heading);
  }

  h1 { font-size: 1.5rem; margin-bottom: 12px; }
  p  { color: var(--text-muted); }
}

// Back to top
.back-to-top {
  position: fixed;
  bottom: 32px; right: 32px;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--gradient-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  transition: all 0.3s;

  &:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.28); }
}

// Dialog
.hire-dialog {
  background: var(--bg-surface) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 16px !important;

  .el-dialog__title { color: var(--text-primary) !important; }
  .el-dialog__headerbtn .el-dialog__close { color: var(--text-secondary) !important; }
}

// Transitions
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter, .fade-leave-to { opacity: 0; }

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
