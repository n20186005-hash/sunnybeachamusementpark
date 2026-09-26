import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// `defineCloudflareConfig()` 展开后即为 OpenNext 校验所需的
// default/middleware override（cloudflare-node / cloudflare-edge / edge / fetch）
// 与 edgeExternals: ["node:crypto"]，缺省的 incrementalCache、tagCache、queue 均为 "dummy"。
//
// 若之后要为 ISR（页面 revalidate 10 分钟、天气数据缓存）启用 R2 增量缓存，
// 可改为：
//   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
// 并先在 Cloudflare 建好 R2 bucket、在 wrangler.jsonc 加 NEXT_INC_CACHE_R2_BUCKET 绑定。
export default defineCloudflareConfig();
