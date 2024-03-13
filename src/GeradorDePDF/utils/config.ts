import {CreateOptions} from 'pdf-lib';

export type PaperFormat = "A3" | "A4" | "A5" | "Legal" | "Letter" | "Tabloid";
export type Orientation = "portrait" | "landscape";

export interface CustomCreateOptions extends CreateOptions {
    format: PaperFormat
    orientation: Orientation
}

// Inserir dados do Chamado
export const pdfConfig = {
    title: "TITULO DO CHAMADO",
    author: "autor",
    fundoTipo: "fundo tipo",
    fundoNome: "fundo nome",
    chamadoNumero: 1,
    descricao: "descrição do chamado"
};

// Escolher Orientação e Formato do PDF
export const options: CustomCreateOptions = {
    format: 'A5',
    orientation: 'landscape'
};
