import {verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {options} from '../utils/config';
import {gerarHTML} from '../template/gerarHTML';
import {gerarPDF} from '../utils/gerarPDF';
import {gerarNomePDF} from '../utils/gerarNomeArquivo';

/**
 *  Executar o código gerarArquivoChamado.ts para gerar o Arquivo PDF
 *
 *  No arquivo config.ts estão os parametros ajustaveis do HTML
 */
( async function gerarArquivoChamado () {

    // Verificar diretório de saida
    await verificarDiretorioSaida();

    // Definir o Nome do Arquivo
    const nomePDF = gerarNomePDF()

    // Preparar o arquivo HTML
    const contentHTML = gerarHTML();

    // Gerar o PDF final
    gerarPDF( contentHTML, nomePDF, options );

})();
