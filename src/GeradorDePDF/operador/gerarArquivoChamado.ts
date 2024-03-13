import {diretorioSaida, verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {options, pdfConfig} from '../utils/config';
import path from 'path';
import {gerarHTML} from '../template/gerarHTML';
import {gerarPDF} from '../utils/gerarPDF';

/**
 *  Executar o código gerarArquivoChamado.ts para gerar o Arquivo PDF
 *
 *  No arquivo config.ts estão os parametros ajustaveis do HTML
 */
( async function gerarArquivoChamado () {

    // Verifica se o diretório de saida existe
    await verificarDiretorioSaida();

    // Define o Nome do Arquivo de acordo com o projeto
    const nomeArquivo = path.join(diretorioSaida, `${pdfConfig.title}${pdfConfig.chamadoNumero} ${pdfConfig.author.toUpperCase()}.pdf`);

    // Preparar o arquivo HTML
    const contentHTML = gerarHTML();

    // Gerar o PDF final
    await gerarPDF( contentHTML, nomeArquivo, options );

})();
