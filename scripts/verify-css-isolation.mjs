import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../dist/ui-components.css", import.meta.url), "utf8");
const cssWithoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
const normalizedCss = cssWithoutComments
  .replace(/\s+/g, " ")
  .replace(/\s*([{},;>+~])\s*/g, "$1")
  .replace(/:\s+/g, ":")
  .trim();
const compactCss = cssWithoutComments.replace(/\s+/g, "");
const ruleCss = normalizedCss.replace(/@layer[^;{}]+;/g, "");

function splitSelectorList(selectorList) {
  const selectors = [];
  let nestingDepth = 0;
  let start = 0;

  for (let index = 0; index < selectorList.length; index += 1) {
    const character = selectorList[index];
    if (character === "(" || character === "[") nestingDepth += 1;
    if (character === ")" || character === "]") nestingDepth -= 1;
    if (character === "," && nestingDepth === 0) {
      selectors.push(selectorList.slice(start, index));
      start = index + 1;
    }
  }

  selectors.push(selectorList.slice(start));
  return selectors;
}

const rules = Array.from(ruleCss.matchAll(/([^{}]+)\{([^{}]*)\}/g), (match) => ({
  selectors: splitSelectorList(match[1]),
  body: match[2],
}));

function ruleContains(selector, declarations = []) {
  return rules.some(
    (rule) => rule.selectors.includes(selector) && declarations.every((declaration) => rule.body.includes(declaration)),
  );
}

const required = [
  [() => normalizedCss.includes(".ordu\\:flex{"), "prefixed utilities"],
  [() => ruleContains(".ord-ui", ["--ord-radius:"]), "scoped token defaults"],
  [() => ruleContains(".ord-ui:where(.dark)", ["--ord-background:"]), "equal-specificity dark token defaults"],
  [() => ruleContains(".ord-ui :where(*)", ["box-sizing:"]), "scoped reset"],
  [() => ruleContains(".ord-ui :where(*):before"), "scoped pseudo-element reset"],
  [() => ruleContains(".ord-ui :where(input,textarea)::placeholder"), "scoped placeholder reset"],
  [
    () => ruleContains(".ord-ui :where(input[type=file])::file-selector-button", ["margin:0", "padding:0"]),
    "scoped file-selector-button spacing reset",
  ],
  [() => normalizedCss.includes("--ordu-tw-"), "namespaced Tailwind implementation variables"],
  [() => normalizedCss.includes("@keyframes ord-spin{"), "namespaced spin animation"],
  [() => normalizedCss.includes("@keyframes ord-bounce{"), "namespaced bounce animation"],
];

const forbidden = [
  [() => ruleContains(":root") || ruleContains(":host"), "global theme variables"],
  [() => normalizedCss.includes("--tw-"), "unprefixed Tailwind implementation variables"],
  [() => normalizedCss.includes(".container{"), "unprefixed container utility"],
  [() => normalizedCss.includes(".flex{"), "unprefixed flex utility"],
  [() => normalizedCss.includes(".hidden{"), "unprefixed hidden utility"],
  [() => ruleContains("*,:after,:before,::backdrop", ["box-sizing:"]), "global preflight reset"],
  [() => ruleContains("h1,h2,h3,h4,h5,h6"), "global heading reset"],
  [() => ruleContains("ol,ul,menu"), "global list reset"],
  [() => ruleContains("button,input,select,optgroup,textarea"), "global control reset"],
  [() => normalizedCss.includes("}.ord-code-block-lines"), "unscoped code-block selector"],
  [() => normalizedCss.includes("}.validation-pass-"), "unscoped validation selector"],
  [() => normalizedCss.includes("@keyframes spin{"), "global spin animation"],
  [() => normalizedCss.includes("@keyframes bounce{"), "global bounce animation"],
  [() => normalizedCss.includes(":where(){"), "empty pseudo-element selector"],
];

const failures = [
  ...required.filter(([check]) => !check()).map(([, label]) => `Missing ${label}`),
  ...forbidden.filter(([check]) => check()).map(([, label]) => `Found ${label}`),
];

const nonEmptyLineCount = cssWithoutComments.split(/\r?\n/).filter((line) => line.trim()).length;
const whitespaceOverhead = (cssWithoutComments.length - compactCss.length) / compactCss.length;
if (nonEmptyLineCount > 3 || whitespaceOverhead > 0.05) {
  failures.push("Built CSS is not minified");
}

const resetIndex = normalizedCss.indexOf(".ord-ui,.ord-ui :where(*)");
const utilityIndex = normalizedCss.indexOf(".ordu\\:flex{");
if (resetIndex >= 0 && utilityIndex >= 0 && resetIndex > utilityIndex) {
  failures.push("Scoped reset is emitted after component utilities");
}

if (failures.length > 0) {
  throw new Error(`CSS isolation verification failed:\n- ${failures.join("\n- ")}`);
}

process.stdout.write("CSS isolation verification passed\n");
