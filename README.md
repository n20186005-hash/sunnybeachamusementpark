# Sunny Beach Amusement Park - 多语言静态指南网站

这是一个使用 Next.js 和 next-intl 构建的多语言静态网站，用于展示保加利亚阳光海滩游乐园的信息。

## 功能特点

- ✅ 支持三种语言：中文 (zh)、英文 (en)、保加利亚语 (bg)
- ✅ 响应式设计，支持深色/浅色模式
- ✅ 照片画廊，支持查看所有照片和灯箱预览
- ✅ 游客评价展示
- ✅ Google 地图集成
- ✅ SEO 优化，包含元数据和多语言交替链接

## 安装和运行

1. 安装依赖：
   ```bash
   npm install
   ```

2. 运行开发服务器：
   ```bash
   npm run dev
   ```

3. 构建静态网站：
   ```bash
   npm run build
   ```

## 项目结构

```
src/
  app/
    [locale]/         # 动态语言路由
      page.tsx        # 主页
      layout.tsx      # 布局文件
  components/        # React 组件
    Header.tsx       # 页头
    Hero.tsx         # 首屏大图
    Gallery.tsx      # 照片画廊
    Footer.tsx       # 页脚
    ...              # 其他组件
  i18n/             # 国际化配置
    routing.ts       # 语言路由配置
    request.ts       # 请求配置
  messages/          # 翻译文件
    en.json          # 英文翻译
    zh.json          # 中文翻译
    bg.json          # 保加利亚语翻译
public/
  gallery/          # 照片文件夹
    sunny-beach-amusement-park-1.jpg  # 照片1
    ...             # 其他照片
```

## 修改说明

### 已完成的修改：

1. **语言支持**：从原来的4种语言（zh, en, el, tr）改为3种语言（zh, en, bg）
2. **照片更新**：使用17张阳光海滩游乐园的照片，文件名已规范化
3. **地图链接**：所有"在Google地图上查看位置"链接都指向同一地址
4. **友情链接**：页脚友情链接更新为保加利亚政府相关网站
5. **删除板块**：删除了"探索更多"板块（RouteSection）
6. **翻译更新**：所有翻译文件已更新为阳光海滩游乐园的内容

### 照片命名规范：

原始文件名：`sunny-beach-amusement-park (1).jpg`
重命名后：`sunny-beach-amusement-park-1.jpg`

这样做是为了避免文件名中的空格和括号导致的问题。

## 测试清单

- [ ] 访问 `/en` 显示英文版本
- [ ] 访问 `/zh` 显示中文版本
- [ ] 访问 `/bg` 显示保加利亚语版本
- [ ] 语言切换器能正常切换语言
- [ ] 照片画廊能显示所有17张照片
- [ ] 点击"显示完整照片"能展开所有照片
- [ ] 所有地图链接都指向正确的Google Maps地址
- [ ] 页脚友情链接正确指向保加利亚政府网站

## 注意事项

1. 确保 `public/gallery/` 文件夹中的照片文件名已正确重命名（无空格和括号）
2. 如果需要添加新的语言，需要更新：
   - `src/i18n/routing.ts` 中的 `locales` 数组
   - `src/components/LanguageToggle.tsx` 中的 `labels` 对象
   - 创建新的翻译文件 `src/messages/[locale].json`
3. Google Maps 嵌入需要有效的 API 密钥（如果需要自定义地图）

## 部署

构建后的静态文件位于 `out/` 文件夹中，可以部署到任何静态网站托管服务。

```bash
npm run build
# 然后将 out/ 文件夹中的内容上传到服务器
```

## 联系方式

如有问题，请通过以下方式联系：
- 电话：+359 554 12345（示例）
- 地址：Flower Street Sunny Beach, 8240 Sunny Beach, Bulgaria
