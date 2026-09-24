/* Sunny Beach Amusement Park — i18n parity 校验脚本
 * 用法: npm run check:i18n  (或 node scripts/check-i18n.mjs)
 * 校验内容:
 *   1. 所有已注册语言消息文件的 key 路径完全一致
 *   2. 各语言中数组字段(列表)的长度一致(如 gallery.captions、faq.items 等)
 * 任一不一致即退出码 1 并输出明细。
 *
 * 自动发现 src/messages 下的全部 *.json，无需在新增语种时改动此脚本。
 * 'en' 作为基准(若缺失则取首个发现的文件)。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, '..', 'src', 'messages');

const jsonFiles = readdirSync(messagesDir).filter((f) => f.endsWith('.json'));
const locales = jsonFiles.map((f) => f.replace(/\.json$/, '')).sort();

if (locales.length < 2) {
  console.error(`✗ FAIL: 发现的语种不足 2 个 (${locales.join(', ')})`);
  process.exit(1);
}

const files = {};
for (const loc of locales) {
  files[loc] = JSON.parse(readFileSync(join(messagesDir, `${loc}.json`), 'utf8'));
}

// 收集所有叶子 key 路径与数组长度
function collectKeys(obj, prefix = '', out = [], listLengths = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      out.push(path);
      listLengths[path] = value.length;
    } else if (value && typeof value === 'object') {
      collectKeys(value, path, out, listLengths);
    } else {
      out.push(path);
    }
  }
  return out;
}

const allKeys = {};
const allListLengths = {};
for (const loc of locales) {
  const keys = [];
  const listLengths = {};
  collectKeys(files[loc], '', keys, listLengths);
  allKeys[loc] = new Set(keys);
  allListLengths[loc] = listLengths;
}

const base = locales.includes('en') ? 'en' : locales[0];
let failed = false;

// 1. key parity (each locale vs base)
for (const loc of locales.filter((l) => l !== base)) {
  const missing = [...allKeys[base]].filter((k) => !allKeys[loc].has(k));
  const extra = [...allKeys[loc]].filter((k) => !allKeys[base].has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`[${loc}] key 差异:`);
    if (missing.length) console.error(`  ${base} 有而 ${loc} 缺: ${missing.join(', ')}`);
    if (extra.length) console.error(`  ${loc} 多出(${base} 无): ${extra.join(', ')}`);
  }
}

// 2. list length parity (each locale vs base)
for (const path of Object.keys(allListLengths[base])) {
  const baseLen = allListLengths[base][path];
  for (const loc of locales.filter((l) => l !== base)) {
    const len = allListLengths[loc][path];
    if (len !== baseLen) {
      failed = true;
      console.error(`[${loc}] 列表长度差异: ${path} = ${len} (${base} = ${baseLen})`);
    }
  }
}

const keyCount = allKeys[base].size;
const listCount = Object.keys(allListLengths[base]).length;
if (failed) {
  console.error(`\n✗ FAIL: 多语 parity 校验未通过 (语种 ${locales.join('/')}, 总 key 数 ${keyCount}, 列表 ${listCount})`);
  process.exit(1);
} else {
  console.log(`✓ PASS: ${locales.join('/')} 多语 parity 一致 (${keyCount} keys, ${listCount} lists)`);
}
