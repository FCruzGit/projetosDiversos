import pdf from 'html-pdf';
import {CustomCreateOptions} from '../config';

export function gerarPDF(configContent:string, nomeArquivoPDF: string, options: CustomCreateOptions) {
    pdf.create(configContent, options).toFile(nomeArquivoPDF, (err) => {
        if (err) {
            console.error('Erro ao gerar PDF:', err);
            return;
        } else {
            console.log(`\n \n PDF gerado com sucesso em ${nomeArquivoPDF} \n`);
        }
    });
}
