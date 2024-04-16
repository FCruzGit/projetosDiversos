// Pagina de Configuração

import {configEsteira} from './parametros';

export const configuracaoEsteira: configEsteira = {

    diretorioSaida: "../../../src/gerarEsteiras/SaidaArquivoBPM",
    operacao: {
        tipo: "LIQUIDAÇÃO" // CESSÃO | LIQUIDAÇÃO | CADASTRO
    },
    fundo: {
        tipo: "FIDC", // FIDC | FIM | FIP
        nome: "return_ix",
        identificacao: 0,

        var: {
            acronimo: "radix", // O acronimo tambem é usado no id do processo
            webhook: "",
            sftpOutput: "gales/liquidacao/outbox", // .../.../outbox
            emails: "brlflow@mg.brltrust.com.br, cessao_fidc@apexgroup.com, gabriel.storalli@radixportfolio.com.br", // Uma string de emails

            schema: {
                input: 'baixaPrecatorio',
                output: 'baixaPrecatorioRetorno'
            },



        }
    }
}
