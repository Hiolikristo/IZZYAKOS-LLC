// IZZYAKOS static-site regression gate.
// Checks same-origin file targets, fragments, empty links, and protected-login routing.
// External deployments require separate live browser/authorization acceptance.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [];
const failures = [];
const seen = new Map();
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(p);
  }
}
const rel = p => path.relative(root, p).split(path.sep).join("/");
const matches = (text, pattern) => [...text.matchAll(pattern)].map(m => m[1]);
function idsFor(p) {
  if (!seen.has(p)) {
    const html = fs.readFileSync(p, "utf8");
    seen.set(p, new Set([...matches(html, /\bid\s*=\s*["']([^"']+)["']/g), ...matches(html, /\bname\s*=\s*["']([^"']+)["']/g)]));
  }
  return seen.get(p);
}
walk(root);
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const name = rel(file);
  if (/boaman\/\?workspace=1#\/company/.test(html)) failures.push(`${name}: obsolete static Company Control route`);
  if (name === "index.html" && !html.includes('href="./services/"')) failures.push("Home: missing services entrypoint");
  if (name === "services/index.html" && !html.includes('mailto:izzyakosllc@gmail.com')) failures.push("Services: missing inquiry destination");
  const base = new URL("https://izzyakos.com/" + name);
  const staticMarkup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const attrs = [...staticMarkup.matchAll(/\b(?:href|src)\s*=\s*["']([^"']*)["']/g)].map(m => m[1].trim());
  for (const href of attrs) {
    if (!href || href === "#" || /^javascript:/i.test(href) || /\bexample\.(com|org)\b/i.test(href)) {
      failures.push(`${name}: empty/placeholder/unsafe target "${href}"`); continue;
    }
    if (/^(mailto:|tel:|data:|blob:)/i.test(href)) continue;
    let dest;
    try { dest = new URL(href.replaceAll("&amp;", "&"), base); }
    catch { failures.push(`${name}: malformed URL "${href}"`); continue; }
    if (dest.origin !== base.origin) continue;
    const p = path.resolve(root, decodeURIComponent(dest.pathname).replace(/^\//, ""));
    const target = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!target.startsWith(root + path.sep) && target !== root) {
      failures.push(`${name}: target escapes site root: ${href}`); continue;
    }
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      failures.push(`${name}: missing target ${href} -> ${rel(target)}`); continue;
    }
    if (dest.hash && target.endsWith(".html")) {
      const id = decodeURIComponent(dest.hash.slice(1));
      if (id && !idsFor(target).has(id)) failures.push(`${name}: missing fragment ${href}`);
    }
  }
}
console.log(`IZZYAKOS static gate: ${files.length} HTML pages checked, ${failures.length} failures`);
if (failures.length) { for (const message of failures) console.error("- " + message); process.exitCode = 1; }
