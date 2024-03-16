import {verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {dir, formatOptions, nomeArquivoPDF, pdfConfig} from '../config';
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
    await verificarDiretorioSaida(dir.saida);

    // Definir o Nome do Arquivo
    const nomePDF = gerarNomePDF(pdfConfig, nomeArquivoPDF, dir.saida)

    // Preparar o arquivo HTML
    const contentHTML = gerarHTML(pdfConfig);

    // Gerar o PDF final
    gerarPDF(contentHTML, nomePDF, formatOptions);

})();
