// Pagina de Configuração

import {configEsteira} from './parametros';

export const configuracaoEsteira: configEsteira = {

    diretorioSaida: "../../../src/gerarEsteiras/SaidaArquivoBPM",
    operacao: {
        tipo: "LIQUIDAÇÃO" // CESSÃO | LIQUIDAÇÃO | CADASTRO
    },
    fundo: {
        tipo: "FIDC", // FIDC | FIM | FIP
        nome: "gales",
        identificacao: 43104412000184,
        var: {
            acronimo: "gales",
            emails: "string",
            sftpOutput: "string",

            schema: {
                input: 'baixaPrecatorio',
                output: 'baixaPrecatorioRetorno'
            }
        }
    }
}
