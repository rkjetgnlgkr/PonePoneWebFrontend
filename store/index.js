export const state = () => ({
  profile: null,
  portfolios: [],
  skills: [],
  experiences: [],
  socialLinks: [],
  themeStyle: 'dark_star',
  loading: false,
  error: null
})

export const mutations = {
  SET_PROFILE(state, data) {
    state.profile = data.user
    state.portfolios = data.portfolios || []
    state.skills = data.skills || []
    state.experiences = data.experiences || []
    state.socialLinks = data.social_links || []
    state.themeStyle = data.layout?.theme_style || 'dark_star'
  },
  SET_LOADING(state, val) { state.loading = val },
  SET_ERROR(state, msg)   { state.error = msg }
}

export const actions = {
  async fetchProfile({ commit }, { $axios, username }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const { data } = await $axios.get(`/public/${username}`)
      commit('SET_PROFILE', data.data || data)
    } catch (e) {
      commit('SET_ERROR', e.response?.status === 404 ? '找不到該使用者' : '資料載入失敗，請稍後再試')
    } finally {
      commit('SET_LOADING', false)
    }
  }
}
