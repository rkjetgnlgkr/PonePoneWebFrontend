# CLAUDE.md — PonePoneWebFrontend

公開展示頁前端。訪客透過 `/{username}` 瀏覽個人主頁，無需登入。

## 技術棧

- **Nuxt 2.17.3**（mode: spa, target: static）
- **Vue 2.7.14**
- **Element UI v2.15.14**
- **@nuxtjs/axios**
- **Vuex**
- **sass**（Dart Sass，Node 24 不相容 `node-sass`，必須用此）

## 啟動指令

```bash
npm install
npm run dev      # http://localhost:3001
npm run build
npm run generate
```

> ⚠️ 安裝時若出現 gyp 錯誤，確認使用的是 `sass` 而非 `node-sass`（`package.json` 內確認）

## 路由

| 路徑 | 檔案 | 說明 |
|------|------|------|
| `/{username}` | `pages/_username.vue` | 動態路由，載入對應使用者資料 |

無其他頁面。所有路徑都會對應到同一個動態頁面。

## 資料流

```
pages/_username.vue created()
  → store.dispatch('fetchProfile', { $axios, username })
    → GET /api/public/{username}
      → store.commit('SET_PROFILE', data)
        → state: { profile, portfolios, skills, experiences, socialLinks, themeStyle }
```

- 成功：渲染各 Section 元件
- 404：顯示「找不到使用者」頁面
- 其他錯誤：顯示「資料載入失敗，請稍後再試」

## Vuex Store（store/index.js）

| State | 型別 | 說明 |
|-------|------|------|
| `profile` | Object | 使用者基本資料 |
| `portfolios` | Array | 作品集（含 images） |
| `skills` | Array | 技能列表 |
| `experiences` | Array | 工作經歷 |
| `socialLinks` | Array | 社群連結 |
| `themeStyle` | String | 主題風格，從 API `layout.theme_style` 讀取，預設 `'dark_star'` |
| `loading` | Boolean | 載入中狀態 |
| `error` | String\|null | 錯誤訊息 |

## 主題系統

`themeStyle` 控制整個頁面的視覺主題，由 `layouts/default.vue` 套用。

| `theme_style` 值 | CSS class | 背景效果 |
|-----------------|-----------|---------|
| `dark_star` | （無，預設） | Canvas 閃爍星空（140 顆星，`rgba(180,180,255)` 配色） |
| `nature` | `theme-nature` | CSS 浮動葉片（18 片，森林綠色系） |
| `terminal` | `theme-terminal` | Canvas 程式碼關鍵字粒子（42 顆，語法高亮多色） |

### 切換主題

直接在資料庫修改 `layout_config.theme_style`，無需改程式碼：

```sql
UPDATE layout_config SET theme_style = 'terminal' WHERE user_id = 1;
```

### CSS 變數架構（assets/scss/main.scss）

所有顏色改用 CSS custom properties，定義於三個選擇器：
- `:root` → dark_star 主題變數
- `.theme-nature` → 大自然唯美風變數
- `.theme-terminal` → Terminal 駭客風變數

主要變數：`--bg-primary`、`--bg-card`、`--color-primary`、`--color-secondary`、`--text-primary`、`--text-secondary`、`--text-muted`、`--border-color`、`--gradient-primary`、`--gradient-title`

## 元件清單

| 元件 | 說明 |
|------|------|
| `layouts/default.vue` | App wrapper；根據 `themeStyle` 渲染背景動畫，套用 theme class |
| `pages/_username.vue` | 主頁面；呼叫 fetchProfile，組裝所有 Section |
| `components/NavBar.vue` | 頂部導覽列，anchor 連結 + Hire Me 按鈕 |
| `components/HeroSection.vue` | Hero banner：姓名、職稱、bio、社群連結、頭像 |
| `components/AboutSection.vue` | 關於我：統計數字 + bio 詳細 |
| `components/PortfolioSection.vue` | 作品集 Grid；hover 顯示「查看專案」按鈕（有圖片時才出現），點擊開啟圖片燈箱 Dialog（左右切換、dot 導覽、鍵盤支援）；「前往連結」維持外部連結 |
| `components/SkillsSection.vue` | 技能展示，含熟練度進度條 |
| `components/ExperienceSection.vue` | 工作經歷時間軸 |
| `components/ContactSection.vue` | 聯絡方式 + 社群連結 + Footer |

## 環境變數

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `API_BASE_URL` | `http://localhost:8000/api` | Axios baseURL |
| `BACKEND_URL` | `http://localhost:8000` | 補全圖片絕對 URL（`HeroSection.vue` 的 avatarUrl 計算用） |
| `PORT` | `3001` | dev server 埠號 |

## Plugins

| Plugin | 說明 |
|--------|------|
| `plugins/element-ui.js` | 全域引入 Element UI |
| `plugins/axios.js` | 攔截 axios 錯誤，`console.error` 輸出（不做重導向） |

## 字體

Google Fonts（`nuxt.config.js` head.link 載入）：
- **Inter**（300–700）— body 文字
- **Space Grotesk**（400–700）— 標題

## Docker

`Dockerfile`（multi-stage）與 `nginx.conf`、`.dockerignore` 已就位：

```bash
docker build \
  --build-arg API_BASE_URL=https://api.example.com/api \
  --build-arg BACKEND_URL=https://api.example.com \
  -t ponepone-frontend .
docker run -p 3001:80 ponepone-frontend
```

- Stage 1（`node:18-alpine`）：`npm ci` + `npm run generate`，產出 `dist/`
- Stage 2（`nginx:alpine`）：serving static files，`try_files $uri /index.html` 支援 SPA 動態路由
- Nuxt 2 generate 輸出 `200.html`（非 `index.html`），build 時已 `cp dist/200.html dist/index.html`

## Known Gotchas

- **node-sass 不相容 Node 24**：安裝時 gyp 永遠不回調，必須用 `sass`（Dart Sass）替代
- **找不到使用者 = API 錯誤**：若顯示「找不到使用者」但使用者確實存在，先確認是否 429（Rate Limit）而非真正的 404
- **theme class 套用位置**：`.theme-nature` / `.theme-terminal` 套用在 `.app-wrapper`（layouts/default.vue），CSS 變數透過 cascade 影響所有子元件；body background 由 `.nature-bg` fixed div 覆蓋，非 CSS 變數直接控制
- **Terminal 主題粒子顏色**：依程式碼 token 類型分色（紫=關鍵字、藍=宣告、橘=函式呼叫、黃=字面值、綠=字串/命令、藍=SQL）
