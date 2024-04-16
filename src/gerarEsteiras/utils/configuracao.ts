// Pagina de Configuração

import {configEsteira} from './parametros';

export const configuracaoEsteira: configEsteira = {

    diretorioSaida: "../../../src/gerarEsteiras/SaidaArquivoBPM",
    operacao: {
        tipo: "CESSÃO" // CESSÃO | LIQUIDAÇÃO | CADASTRO
    },
    fundo: {
        tipo: "FIDC", // FIDC | FIM | FIP
        nome: "return_ix",
        identificacao: 0,

        var: {
            acronimo: "return_ix", // IMPORTANTE! O acronimo tambem é usado no id do processo
            webhook: "return_ix/webhook",
            sftpOutput: "return_ix/liquidacao/outbox",

            email: {
                notificarSituacao: "brlflow@mg.brltrust.com.br, cessao_fidc@apexgroup.com, return_ix@return_ix.com.br",
                notificarPendenciaLastro: "cessao_fidc@brltrust.com.br, ti.developers@apexgroup.com",
                notificarPagamentoComplementar: "cessao_fidc@brltrust.com.br, processamento.fidc@apexgroup.com, frank.moreira@apexgroup.com, paulo.moraes@apexgroup.com, levi.avelar@apexgroup.com, ti.developers@apexgroup.com",
            },

            schema: {
                input: 'cessaoPrecatorio',
                output: 'cessaoPrecatorioRetorno'
            },
        }
    }
}
