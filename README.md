# PonePoneWebFrontend

個人形象網站前台 — 現代暗色風格的個人作品集展示頁面。

**技術棧**：Vue2 · Nuxt2 SPA · ElementUI · SCSS · RWD

## 快速啟動

```bash
npm install
npm run dev    # http://localhost:3001
```

## 路由

```
http://localhost:3001/{username}
```

根據 username 從後端 API 取得資料並展示對應使用者的個人頁面。

## 環境變數

在專案根目錄建立 `.env` 或直接設定系統環境變數：

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `API_BASE_URL` | `http://localhost:8000/api` | Laravel 後端 API base URL |
| `BACKEND_URL` | `http://localhost:8000` | 用於補全圖片絕對路徑 |
| `PORT` | `3001` | 前端伺服器 port |

## 頁面結構

| 區塊 | 元件 | 說明 |
|------|------|------|
| 導航欄 | `NavBar.vue` | Fixed sticky nav，含滾動高亮與 mobile hamburger |
| Hero | `HeroSection.vue` | 全螢幕首頁，姓名 + 職稱 + 社群連結 |
| 關於我 | `AboutSection.vue` | 個人簡介 + 統計數據 |
| 作品集 | `PortfolioSection.vue` | 卡片格狀展示，含 hover overlay |
| 專業技能 | `SkillsSection.vue` | 動態 skill bar，按分類分組 |
| 工作經歷 | `ExperienceSection.vue` | 時間軸排版 |
| 聯絡方式 | `ContactSection.vue` | 聯絡資訊 + 社群連結 |

## 與後端的搭配

後端：`PonePoneWebBackend`（Laravel 7，port 8000）

資料來源：`GET /api/public/{username}`
