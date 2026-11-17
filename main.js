const Blockchain = require('./blockchain');

function imprimirCadeia(cadeia) {
  for (const bloco of cadeia) {
    console.log(
      `Índice: ${bloco.indice} | Dados: ${bloco.dados} | Hash: ${bloco.hash.slice(0, 10)}`,
    );
  }
}

function executarDemonstracao() {
  const registro = new Blockchain();

  registro.adicionar('Entrega E-001 para Ji-Paraná: em rota');
  registro.adicionar('Entrega E-002 para Manaus: entregue');
  registro.adicionar('Entrega E-003 para Porto Velho: separada');

  console.log('Registro de entregas:');
  imprimirCadeia(registro.cadeia);
  console.log(`\nCadeia válida? ${registro.ehValida()}`);

  try {
    registro.adicionar('Oi');
  } catch (erro) {
    console.log(`\nErro ao cadastrar entrega: ${erro.message}`);
  }

  registro.cadeia[1].dados = 'Entrega E-001 adulterada';
  console.log(`\nCadeia válida após adulteração? ${registro.ehValida()}`);
}

if (require.main === module) {
  executarDemonstracao();
}

module.exports = imprimirCadeia;
