import fs from 'fs';
import path from 'path';
import {chamado, pdfConfig} from '../dados/config';
import { templateHTML } from "../template/template";
import pdf from 'html-pdf';

function gerarPDF(config: { title: string; author: string; content: string }) {
    const outputDir = '../../../src/GeradorDePDF/saidaArquivo';
    const filePath = path.join(__dirname, outputDir, `${config.title}${chamado.numero} ${config.author}.pdf`);

    // Criar o diretório de saída, se não existir
    if (!fs.existsSync(path.join(__dirname, outputDir))) {
        fs.mkdirSync(path.join(__dirname, outputDir), { recursive: true });
    }

    // Gerar PDF a partir do conteúdo HTML
    pdf.create(config.content).toFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao gerar PDF:', err);
            return;
        }
        // Log de conclusão
        console.log(`\n \n PDF "${config.title}${chamado.numero}" gerado com sucesso em ${filePath} \n`);
    });
}

// Gerar PDF automaticamente com o conteúdo do template HTML fornecido
gerarPDF({ title: pdfConfig.title, author: pdfConfig.author, content: templateHTML });
