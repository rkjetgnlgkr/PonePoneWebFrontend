<template>
  <div class="app-wrapper" :class="themeClass">
    <!-- dark_star: canvas 星空 -->
    <canvas v-if="isStarTheme" id="stars-canvas" class="stars-canvas"></canvas>

    <!-- nature: 浮動葉片背景 -->
    <div v-else-if="isNatureTheme" class="nature-bg">
      <div
        v-for="leaf in leaves"
        :key="leaf.id"
        class="nature-bg__leaf"
        :style="leaf.style"
        v-html="leaf.svg"
      ></div>
    </div>

    <!-- terminal: Matrix 數字雨 -->
    <canvas v-else-if="isTerminalTheme" id="matrix-canvas" class="matrix-canvas"></canvas>

    <nuxt />
  </div>
</template>

<script>
const LEAF_COLORS = ['#52b788', '#74c69d', '#95d5b2', '#2d7a4f', '#a8d5b5', '#40916c']

const LEAF_SVG = (color) =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.14L5.71 21 6 20.14C6.44 18.8 7.36 16.92 9 15 11.07 12.7 13.79 11.24 18 11" stroke="${color}" stroke-width="1" stroke-linecap="round"/>
    <path d="M3 22C4 19.5 6 13 14 9C18 7 22 7 22 7C22 7 22 11 20 15C17.36 19.65 12 22 3 22Z"/>
  </svg>`

function makeLeaves(count) {
  return Array.from({ length: count }, (_, i) => {
    const size     = Math.random() * 18 + 14
    const left     = Math.random() * 100
    const duration = Math.random() * 18 + 14
    const delay    = Math.random() * 20
    const color    = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
    return {
      id: i,
      svg: LEAF_SVG(color).replace(/width="24"/g, `width="${size}"`).replace(/height="24"/g, `height="${size}"`),
      style: {
        left:              `${left}%`,
        width:             `${size}px`,
        height:            `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay:    `${delay}s`,
      }
    }
  })
}

// 依 token 類型分組，對應語法高亮配色
const CODE_TOKEN_GROUPS = [
  { color: '#c792ea', tokens: ['function', 'class', 'extends', 'new', 'typeof', 'instanceof', 'interface'] },  // 紫：關鍵字
  { color: '#89ddff', tokens: ['const', 'let', 'var', 'import', 'export', 'from', 'return', 'async', 'await', 'try', 'catch'] }, // 藍：宣告
  { color: '#c3e88d', tokens: ['"string"', "'hello'", '`template`', 'npm run', 'git commit', 'docker run', 'kubectl'] }, // 綠：字串/命令
  { color: '#f78c6c', tokens: ['useState', 'useEffect', 'Promise', '.map()', '.filter()', '.reduce()', 'console.log', 'setTimeout'] }, // 橘：函式呼叫
  { color: '#ffcb6b', tokens: ['true', 'false', 'null', 'undefined', '0', '42', '3.14', 'NaN', 'Infinity'] }, // 黃：字面值
  { color: '#89ddff', tokens: ['=>', '{}', '[]', '&&', '||', '===', '!==', '??', '?.', '...'] }, // 青：運算子
  { color: '#82aaff', tokens: ['SELECT *', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'INSERT INTO'] }, // 藍：SQL
  { color: '#00ff41', tokens: ['01101', '10010', '11001', '10110', '00111'] }, // 亮綠：二進位
]

const ALL_TOKENS_WITH_COLOR = CODE_TOKEN_GROUPS.flatMap(g => g.tokens.map(t => ({ text: t, color: g.color })))

function randomToken() {
  return ALL_TOKENS_WITH_COLOR[Math.floor(Math.random() * ALL_TOKENS_WITH_COLOR.length)]
}

function makeCodeParticles(w, h) {
  return Array.from({ length: 42 }, (_, i) => {
    const token = randomToken()
    return {
      id:    i,
      text:  token.text,
      color: token.color,
      x:     Math.random() * w,
      y:     Math.random() * h,
      vy:    -(Math.random() * 0.4 + 0.15),
      vx:    (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.45 + 0.12,
      size:  Math.random() * 5 + 10,
    }
  })
}

export default {
  computed: {
    themeStyle()      { return this.$store.state.themeStyle || 'dark_star' },
    isStarTheme()     { return this.themeStyle === 'dark_star' },
    isNatureTheme()   { return this.themeStyle === 'nature' },
    isTerminalTheme() { return this.themeStyle === 'terminal' },
    themeClass() {
      if (this.themeStyle === 'nature')   return 'theme-nature'
      if (this.themeStyle === 'terminal') return 'theme-terminal'
      return ''
    },
    leaves() { return this.isNatureTheme ? makeLeaves(18) : [] }
  },

  watch: {
    isStarTheme(val)     { if (val) this.$nextTick(() => this.initStars()) },
    isTerminalTheme(val) { if (val) this.$nextTick(() => this.initMatrix()) }
  },

  mounted() {
    if (this.isStarTheme)     { this.initStars();  window.addEventListener('resize', this.initStars) }
    if (this.isTerminalTheme) { this.initMatrix(); window.addEventListener('resize', this.initMatrix) }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initStars)
    window.removeEventListener('resize', this.initMatrix)
    if (this._rafId) cancelAnimationFrame(this._rafId)
  },

  methods: {
    initStars() {
      const canvas = document.getElementById('stars-canvas')
      if (!canvas) return
      if (this._rafId) cancelAnimationFrame(this._rafId)
      const ctx = canvas.getContext('2d')
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight

      const stars = Array.from({ length: 140 }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  Math.random() * 1.4 + 0.3,
        a:  Math.random(),
        da: (Math.random() - 0.5) * 0.008
      }))

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        stars.forEach(s => {
          s.a += s.da
          if (s.a <= 0 || s.a >= 1) s.da = -s.da
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(180,180,255,${s.a})`
          ctx.fill()
        })
        this._rafId = requestAnimationFrame(draw)
      }
      draw()
    },

    initMatrix() {
      const canvas = document.getElementById('matrix-canvas')
      if (!canvas) return
      if (this._rafId) cancelAnimationFrame(this._rafId)

      const ctx = canvas.getContext('2d')
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight

      const particles = makeCodeParticles(canvas.width, canvas.height)

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach(p => {
          ctx.font      = `${p.size}px "Courier New", monospace`
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.alpha
          ctx.fillText(p.text, p.x, p.y)
          ctx.globalAlpha = 1

          p.x += p.vx
          p.y += p.vy

          // 飄出頂部後從底部隨機位置重新出現
          if (p.y < -20) {
            const token = randomToken()
            p.y     = canvas.height + 10
            p.x     = Math.random() * canvas.width
            p.text  = token.text
            p.color = token.color
            p.alpha = Math.random() * 0.45 + 0.12
            p.size  = Math.random() * 5 + 10
          }
          // 邊界循環
          if (p.x < -100) p.x = canvas.width + 10
          if (p.x > canvas.width + 100) p.x = -10
        })

        this._rafId = requestAnimationFrame(draw)
      }
      draw()
    }
  }
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  min-height: 100vh;
}

.stars-canvas,
.matrix-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
