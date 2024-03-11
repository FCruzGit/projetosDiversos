import {outputDir, verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {CustomCreateOptions, templateHTML} from '../template/template';
import {data} from '../utils/calcularData';
import {chamado, pdfConfig} from '../utils/config';
import pdf from 'html-pdf';
import path from 'path';

async function gerarPDF(config: { title: string; author: string; content: string }) {

    await verificarDiretorioSaida();

    // Formatar PDF como A5
    const options: CustomCreateOptions = { format: 'A5' as const };

    // Calcula os valores de Data
    let templateComData = config.content.replace(/\${data.dia}/g, data.dia.toString());
    templateComData = templateComData.replace(/\${data.mes}/g, data.mes);
    templateComData = templateComData.replace(/\${data.hora}/g, data.hora);

    //Define o Nome do Arquivo
    const nomeArquivo = path.join(outputDir, `${config.title}${chamado.numero} ${config.author.toUpperCase()}.pdf`);

    // Transformar HTML em PDF
    pdf.create(config.content, options).toFile(nomeArquivo, (err) => {
        if (err) {
            console.error('Erro ao gerar PDF:', err);
            return;
        }
        // mensagem de conclusão no terminal
        console.log(`\n \n PDF gerado com sucesso em ${nomeArquivo} \n`);
    });
}

gerarPDF({ title: pdfConfig.title, author: pdfConfig.author, content: templateHTML });
