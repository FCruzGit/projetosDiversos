import {CreateOptions} from 'pdf-lib';

export type PaperFormat = "A3" | "A4" | "A5" | "Legal" | "Letter" | "Tabloid";
export type Orientation = "portrait" | "landscape";

export interface CustomCreateOptions extends CreateOptions {
    format: PaperFormat
    orientation: Orientation
}

// Inserir dados do Chamado
export const pdfConfig = {
    title: "titulo do chamado",
    author: "autor",
    fundoTipo: "fundo tipo",
    fundoNome: "fundo nome",
    chamadoNumero: 1,
    descricao: "descrição do chamado"
};

// Nome do arquivo será dinamico?
export const nomeArquivoPDF = {
    nomeDinamico: true,
    nomeArquivo: "CHAMADO_FIDC"
}

// Escolher Orientação e Formato do PDF
export const options: CustomCreateOptions = {
    format: 'A5',
    orientation: 'landscape'
};
