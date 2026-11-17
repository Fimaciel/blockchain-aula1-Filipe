# Blockchain — registro de entregas

Projeto didático que demonstra três ideias básicas de uma blockchain:

- cada bloco possui um hash SHA-256 calculado a partir de seu conteúdo;
- cada bloco aponta para o hash do bloco anterior;
- a cadeia pode ser percorrida para detectar adulterações.

## Requisitos

- Node.js 18 ou mais recente.

## Como executar

```bash
npm start
```

O programa cadastra três entregas, mostra a cadeia válida, trata uma tentativa
de cadastro inválida e altera uma entrega antiga para demonstrar a detecção da
adulteração.

## Como testar

```bash
npm test
```

Os testes usam apenas os módulos nativos `node:test` e `node:assert`.
