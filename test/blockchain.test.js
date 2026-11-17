const test = require('node:test');
const assert = require('node:assert/strict');

const Blockchain = require('../blockchain');

test('começa com o bloco gênese', () => {
  const registro = new Blockchain();

  assert.equal(registro.cadeia.length, 1);
  assert.equal(registro.cadeia[0].indice, 0);
  assert.equal(registro.cadeia[0].dados, 'Bloco Gênese');
  assert.equal(registro.cadeia[0].hashAnterior, '0');
});

test('adiciona blocos encadeados ao hash anterior', () => {
  const registro = new Blockchain();

  registro.adicionar('Primeira entrega');
  registro.adicionar('Segunda entrega');

  assert.equal(registro.cadeia[1].indice, 1);
  assert.equal(registro.cadeia[1].hashAnterior, registro.cadeia[0].hash);
  assert.equal(registro.cadeia[2].indice, 2);
  assert.equal(registro.cadeia[2].hashAnterior, registro.cadeia[1].hash);
  assert.equal(registro.ehValida(), true);
});

test('não altera a cadeia quando os dados são inválidos', () => {
  const registro = new Blockchain();

  assert.throws(
    () => registro.adicionar('Oi'),
    new Error('Os dados devem ter entre 3 e 80 caracteres.'),
  );
  assert.equal(registro.cadeia.length, 1);
});

test('detecta adulteração dos dados ou do hash de um bloco', () => {
  const registroComDadosAdulterados = new Blockchain();
  registroComDadosAdulterados.adicionar('Primeira entrega');
  registroComDadosAdulterados.cadeia[1].dados = 'Entrega adulterada';
  assert.equal(registroComDadosAdulterados.ehValida(), false);

  const registroComHashAdulterado = new Blockchain();
  registroComHashAdulterado.adicionar('Primeira entrega');
  registroComHashAdulterado.cadeia[1].hash = 'hash adulterado';
  assert.equal(registroComHashAdulterado.ehValida(), false);
});

test('detecta quebra do encadeamento pelo hash anterior', () => {
  const registro = new Blockchain();

  registro.adicionar('Primeira entrega');
  registro.adicionar('Segunda entrega');
  registro.cadeia[2].hashAnterior = 'hash incorreto';

  assert.equal(registro.ehValida(), false);
});
