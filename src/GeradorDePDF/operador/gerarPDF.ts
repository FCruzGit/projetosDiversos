import {outputDir, verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {CustomCreateOptions, templateHTML} from '../template/template';
import {processarTemplate} from '../utils/calcularData';
import {pdfConfig} from '../utils/config';
import pdf from 'html-pdf';
import path from 'path';

/**
 *  Executar o código gerarPDF.ts para gerar o Arquivo PDF
 *
 *  No arquivo config.ts estão os dados a preencher do HTML
 */
async function gerarPDF(config: { title: string; author: string; content: string; }) {

    // Verifica se o diretório de saida existe, se não, cria o mesmo.
    await verificarDiretorioSaida();

    // Escolher Orientação e Formato do PDF
    const options: CustomCreateOptions = {
        format: 'A5',
        orientation: 'landscape'
    };

    // Calcula os valores de Data
    const dataAtualHTML = processarTemplate(config.content);

    //Define o Nome do Arquivo
    const nomeArquivo = path.join(outputDir, `${config.title}${pdfConfig.chamadoNumero} ${config.author.toUpperCase()}.pdf`);

    // Transformar HTML em PDF
    pdf.create(config.content, options).toFile(nomeArquivo, (err) => {
        if (err) {
            console.error('Erro ao gerar PDF:', err);
            return;
        }
        else {
            console.log(`\n \n PDF gerado com sucesso em ${nomeArquivo} \n`);
        }
    });
}

gerarPDF({ title: pdfConfig.title, author: pdfConfig.author, content: templateHTML });
