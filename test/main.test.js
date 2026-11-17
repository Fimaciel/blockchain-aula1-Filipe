const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

test('executa a demonstração completa sem derrubar o programa', () => {
  const caminhoMain = path.join(__dirname, '..', 'main.js');
  const resultado = spawnSync(process.execPath, [caminhoMain], {
    encoding: 'utf8',
  });

  assert.equal(resultado.status, 0, resultado.stderr);
  assert.match(resultado.stdout, /Cadeia válida\? true/);
  assert.match(
    resultado.stdout,
    /Erro ao cadastrar entrega: Os dados devem ter entre 3 e 80 caracteres\./,
  );
  assert.match(resultado.stdout, /Cadeia válida após adulteração\? false/);
});
