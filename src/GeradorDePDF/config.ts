import {CreateOptions} from 'pdf-lib';

export interface CustomCreateOptions extends CreateOptions {
    format: PaperFormat
    orientation: Orientation
}

export type PaperFormat = "A3" | "A4" | "A5" | "Legal" | "Letter" | "Tabloid";
export type Orientation = "portrait" | "landscape";


// Inserir dados do Chamado
export const pdfConfig = {
    tituloPDF: "titulo do chamado",
    autor: "autor",
    fundoTipo: "fundo tipo",
    fundoNome: "fundo nome",
    numeroTitulo: 1,
    descricao: "descrição do chamado"
};

// Diretorio de Saida de arquivos
export const dir = {
    saida: "../../../src/GeradorDePDF/saidaArquivo"
}

// Nome do arquivo será dinamico?
export const nomeArquivoPDF = {
    gerarNome: true, // Se verdadeiro, o nome será gerado com base nas configurações.
    nomeDefinido: "CHAMADO_FIDC"
}

// Escolher Orientação e Formato do PDF
export const formatOptions: CustomCreateOptions = {
    format: 'A3',
    orientation: 'landscape'
};
