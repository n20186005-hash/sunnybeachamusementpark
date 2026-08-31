# Sunny Beach Amusement Park - 多语言静态指南网站

这是一个使用 Next.js 15 和 next-intl 构建的多语言网站，用于展示保加利亚阳光海滩游乐园（Лунапарк Слънчев бряг）的信息。项目为独立的第三方旅游信息科普站，非盈利、中立，只描述服务类型、不推荐具体商户。

## 功能特点

- ✅ 支持三种语言：中文 (zh, `/zh`)、英文 (en, `/en`)、保加利亚语 (bg, `/bg`，默认)
- ✅ 根路径 `/` 自动重定向到 `/bg`，middleware 兜底语言前缀
- ✅ 响应式设计，支持深色/浅色模式
- ✅ 17 张照片画廊（无空格/括号的 SEO 友好文件名），支持灯箱预览
- ✅ 游客评价展示
- ✅ Google 地图集成（嵌入 iframe + 4 处可见链接 + JSON-LD sameAs）
- ✅ SEO：`sitemap.xml`（12 URL，含 xhtml:link hreflang 交替链接）、`robots.txt`
- ✅ E-E-A-T 结构化数据：TouristAttraction（含 openingHoursSpecification）+ Organization + WebSite + WebPage（含 dateModified）+ FAQPage
- ✅ PWA：manifest、Service Worker、图标
- ✅ 中立合规：设施板块只写类型不推荐商户，外链全部为官方域名

## 安装和运行

1. 安装依赖：
   ```bash
   npm install
   ```

2. 运行开发服务器：
   ```bash
   npm run dev
   ```

3. 构建网站：
   ```bash
   npm run build
   ```

4. 校验三语翻译 parity（key 与列表长度一致性）：
   ```bash
   npm run check:i18n
   ```

## 项目结构

```
src/
  app/
    [locale]/         # 动态语言路由
      page.tsx        # 主页（10 个内容板块）
      layout.tsx      # 布局 + JSON-LD 结构化数据 + GA + PWA
      privacy-policy/ # 隐私政策
      terms-of-service/ # 服务条款
      cookie-settings/  # Cookie 设置
    sitemap.ts        # sitemap.xml（含 hreflang alternates）
    robots.ts         # robots.txt
    manifest.ts       # PWA manifest
    icon.svg          # PWA 图标
  components/         # React 组件
    Header.tsx        # 页头（5 项锚点导航 + 语言切换）
    Hero.tsx          # 首屏大图
    Intro.tsx         # 简介 + 游览贴士
    BasicInfo.tsx     # 基本信息卡
    Hours.tsx         # 开放时间
    Tickets.tsx       # 门票信息
    Transport.tsx     # 交通指南
    FacilitiesSection.tsx # 游客设施（6 类）
    HistorySection.tsx    # 历史时间线（5 阶段）
    InfoSection.tsx       # 知识板块（7 段）
    LegendsSection.tsx    # 传说与文化（4 条）
    Gallery.tsx       # 照片画廊（17 张 + 灯箱）
    Reviews.tsx       # 游客评价
    FAQSection.tsx    # FAQ 手风琴
    MapEmbed.tsx      # 地图嵌入
    SourcesSection.tsx   # 官方来源
    Footer.tsx        # 页脚（免责声明 + 官方链接）
    LanguageToggle.tsx   # 语言切换器
  i18n/
    routing.ts        # 语言路由配置
    request.ts        # 请求配置
  messages/
    en.json           # 英文翻译
    zh.json           # 中文翻译
    bg.json           # 保加利亚语翻译
scripts/
  check-i18n.mjs      # 三语 parity 校验脚本
public/
  gallery/            # 照片文件夹（17 张，sunny-beach-amusement-park-1..17.jpg）
  icons/icon.svg      # 站点图标
  sw.js               # Service Worker
```

## 核心数据（2026-08-31 核对）

- 评分：4.4 (7,278)
- 开放时间：旺季 18:00–00:00
- 电话：+359 897 847 003
- 地址：Flower Street Sunny Beach, 8240 Sunny Beach, Bulgaria（Plus Code MPV7+59）
- Google Maps：https://maps.app.goo.gl/2vQQGdK5Vr23inr86
- 域名：https://sunnybeachamusementpark.com

## 注意事项

1. `public/gallery/` 中照片文件名保持 `sunny-beach-amusement-park-1..17.jpg`（无空格和括号）。
2. 新增语言需同步更新：`src/i18n/routing.ts` 的 `locales`、`src/components/LanguageToggle.tsx` 的 `labels`，并新建 `src/messages/[locale].json`，最后运行 `npm run check:i18n` 校验。
3. 修改任一消息文件后，务必运行 `npm run check:i18n`，保证三语 key 与列表长度一致。
4. 营业时间（旺季 6–9 月 18:00–00:00）同时存在于 `messages/*.json` 的 `hours.parkTime`、FAQ 与 JSON-LD `openingHoursSpecification`，改动需三处同步。
5. bg/zh 文案为机器辅助翻译，上线前建议由母语者终校。
6. 网站为独立科普项目，与保加利亚政府或任何官方机构无隶属关系（页脚已声明）。

## 部署

构建产物位于 `.next/` 目录：

```bash
npm run build
npm run start   # Node 环境（生产预览）
```

也可直接部署到 Vercel / Netlify 等支持 Next.js 的托管平台。

## 联系方式

- 电话：+359 897 847 003
- 地址：Flower Street Sunny Beach, 8240 Sunny Beach, Bulgaria
