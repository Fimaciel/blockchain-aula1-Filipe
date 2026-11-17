const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const Bloco = require('../bloco');

test('calcula um hash SHA-256 determinístico a partir dos dados do bloco', () => {
  const bloco = new Bloco(1, 'Entrega válida', 'hash-anterior');
  const hashEsperado = crypto
    .createHash('sha256')
    .update('1Entrega válidahash-anterior')
    .digest('hex');

  assert.equal(bloco.hash, hashEsperado);
  assert.match(bloco.hash, /^[a-f0-9]{64}$/);
  assert.equal(bloco.calcularHash(), bloco.hash);
});

test('aceita dados nos limites de 3 e 80 caracteres', () => {
  assert.doesNotThrow(() => new Bloco(0, 'abc', '0'));
  assert.doesNotThrow(() => new Bloco(1, 'a'.repeat(80), 'hash'));
});

test('rejeita dados ausentes ou que não sejam uma string', () => {
  assert.throws(
    () => new Bloco(0, undefined, '0'),
    new Error('Os dados são obrigatórios e devem ser uma string.'),
  );
  assert.throws(
    () => new Bloco(0, 123, '0'),
    new Error('Os dados são obrigatórios e devem ser uma string.'),
  );
});

test('rejeita dados fora do intervalo permitido', () => {
  assert.throws(
    () => new Bloco(0, 'ab', '0'),
    new Error('Os dados devem ter entre 3 e 80 caracteres.'),
  );
  assert.throws(
    () => new Bloco(0, 'a'.repeat(81), '0'),
    new Error('Os dados devem ter entre 3 e 80 caracteres.'),
  );
});

test('rejeita índice inválido e hash anterior que não seja string', () => {
  assert.throws(
    () => new Bloco(-1, 'Entrega', '0'),
    new Error('O índice deve ser um número inteiro não negativo.'),
  );
  assert.throws(
    () => new Bloco(1.5, 'Entrega', '0'),
    new Error('O índice deve ser um número inteiro não negativo.'),
  );
  assert.throws(
    () => new Bloco(1, 'Entrega', 0),
    new Error('O hash anterior deve ser uma string.'),
  );
});
