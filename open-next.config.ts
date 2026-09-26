import cache from "@opennextjs/cloudflare/kv-cache";

const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: async () => cache,
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

export default config;
