import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../dist/ui-components.css", import.meta.url), "utf8");

const required = [
  [".ordu\\:flex{", "prefixed utilities"],
  [".ord-ui{--ord-radius:", "scoped token defaults"],
  [".ord-ui,.ord-ui :where(*)", "scoped reset"],
  [".ord-ui :where(*):before", "scoped pseudo-element reset"],
  [".ord-ui :where(input,textarea)::placeholder", "scoped placeholder reset"],
  [
    ".ord-ui :where(input[type=file])::file-selector-button{margin:0;padding:0}",
    "scoped file-selector-button spacing reset",
  ],
  ["--ordu-tw-", "namespaced Tailwind implementation variables"],
  ["@keyframes ord-spin{", "namespaced spin animation"],
  ["@keyframes ord-bounce{", "namespaced bounce animation"],
];

const forbidden = [
  [":root,:host{", "global theme variables"],
  ["--tw-", "unprefixed Tailwind implementation variables"],
  [".container{", "unprefixed container utility"],
  [".flex{", "unprefixed flex utility"],
  [".hidden{", "unprefixed hidden utility"],
  ["*,:after,:before,::backdrop{box-sizing", "global preflight reset"],
  ["}h1,h2,h3,h4,h5,h6{", "global heading reset"],
  ["}ol,ul,menu{", "global list reset"],
  ["}button,input,select,optgroup,textarea{", "global control reset"],
  ["}.ord-code-block-lines", "unscoped code-block selector"],
  ["}.validation-pass-", "unscoped validation selector"],
  ["@keyframes spin{", "global spin animation"],
  ["@keyframes bounce{", "global bounce animation"],
  [":where(){", "empty pseudo-element selector"],
];

const failures = [
  ...required.filter(([fragment]) => !css.includes(fragment)).map(([, label]) => `Missing ${label}`),
  ...forbidden.filter(([fragment]) => css.includes(fragment)).map(([, label]) => `Found ${label}`),
];

const resetIndex = css.indexOf(".ord-ui,.ord-ui :where(*)");
const utilityIndex = css.indexOf(".ordu\\:flex{");
if (resetIndex >= 0 && utilityIndex >= 0 && resetIndex > utilityIndex) {
  failures.push("Scoped reset is emitted after component utilities");
}

if (failures.length > 0) {
  throw new Error(`CSS isolation verification failed:\n- ${failures.join("\n- ")}`);
}

process.stdout.write("CSS isolation verification passed\n");
