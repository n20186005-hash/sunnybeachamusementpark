/* Sunny Beach Amusement Park — 三语 i18n parity 校验脚本
 * 用法: npm run check:i18n  (或 node scripts/check-i18n.mjs)
 * 校验内容:
 *   1. en / bg / zh 三个消息文件的 key 路径完全一致
 *   2. 各语言中数组字段(列表)的长度一致(如 gallery.captions、faq.items 等)
 * 任一不一致即退出码 1 并输出明细。
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, '..', 'src', 'messages');
const locales = ['en', 'bg', 'zh'];

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

let failed = false;

// 1. key parity
const base = locales[0];
for (const loc of locales.slice(1)) {
  const missing = [...allKeys[base]].filter((k) => !allKeys[loc].has(k));
  const extra = [...allKeys[loc]].filter((k) => !allKeys[base].has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`[${loc}] key 差异:`);
    if (missing.length) console.error(`  en 有而 ${loc} 缺: ${missing.join(', ')}`);
    if (extra.length) console.error(`  ${loc} 多出(en 无): ${extra.join(', ')}`);
  }
}

// 2. list length parity
for (const path of Object.keys(allListLengths[base])) {
  const baseLen = allListLengths[base][path];
  for (const loc of locales.slice(1)) {
    const len = allListLengths[loc][path];
    if (len !== baseLen) {
      failed = true;
      console.error(`[${loc}] 列表长度差异: ${path} = ${len} (en = ${baseLen})`);
    }
  }
}

const keyCount = allKeys[base].size;
const listCount = Object.keys(allListLengths[base]).length;
if (failed) {
  console.error(`\n✗ FAIL: 三语 parity 校验未通过 (总 key 数 ${keyCount}, 列表 ${listCount})`);
  process.exit(1);
} else {
  console.log(`✓ PASS: en/bg/zh 三语 parity 一致 (${keyCount} keys, ${listCount} lists)`);
}
