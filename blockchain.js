const Bloco = require('./bloco');

class Blockchain {
  constructor() {
    this.cadeia = [new Bloco(0, 'Bloco Gênese', '0')];
  }

  adicionar(dados) {
    const ultimoBloco = this.cadeia[this.cadeia.length - 1];
    const novoBloco = new Bloco(
      this.cadeia.length,
      dados,
      ultimoBloco.hash,
    );

    this.cadeia.push(novoBloco);
  }

  ehValida() {
    for (let indice = 1; indice < this.cadeia.length; indice += 1) {
      const blocoAtual = this.cadeia[indice];
      const blocoAnterior = this.cadeia[indice - 1];

      if (blocoAtual.hash !== blocoAtual.calcularHash()) {
        return false;
      }

      if (blocoAtual.hashAnterior !== blocoAnterior.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
