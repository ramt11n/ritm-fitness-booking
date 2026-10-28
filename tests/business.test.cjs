'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];
const businessLogic = script.split('let state,persistent=')[0];
const context = vm.createContext({ Intl, Date, console });

vm.runInContext(businessLogic, context);
const groups = vm.runInContext('[runSelfTests(), runAccessTests()]', context);
for (const group of groups) {
  for (const result of group.results) {
    assert.equal(result.passed, true, result.name + (result.error ? ': ' + result.error : ''));
  }
  assert.equal(group.passed, group.total);
}

const digest = crypto.createHash('sha256').update(script).digest('base64');
assert.ok(html.includes("script-src 'sha256-" + digest + "'"), 'CSP script digest must match');
assert.ok(html.includes("connect-src 'none'"), 'External connections must remain blocked');
assert.ok(!/\bfetch\s*\(|\bimport\s*\(/.test(script), 'App must not require runtime imports or fetch');
console.log(`${groups.reduce((n, g) => n + g.passed, 0)} business and role checks passed; offline/CSP checks passed.`);
