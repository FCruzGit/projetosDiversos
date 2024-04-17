// Pagina de Configuração

import {configEsteira} from './parametros';

export const configuracaoEsteira: configEsteira = {

    diretorioSaida: "../../../src/gerarEsteiras/SaidaArquivoBPM",
    operacao: {
        tipo: "CESSÃO" // CESSÃO | LIQUIDAÇÃO | CADASTRO
    },
    fundo: {
        tipo: "FIDC", // FIDC | FIM | FIP
        nome: "gales",
        identificacao: 0,

        var: {
            acronimo: "radix", // esse campo tambem serve para o Id do Bpm
            webhook: "webhook/radix",
            sftpOutput: "gales/cessao/outbox",

            email: {
                tarefaPadrao: "brlflow@mg.brltrust.com.br, cessao_fidc@apexgroup.com, gabriel.storalli@radixportfolio.com.br",
                notificarPendenciaLastro: "cessao_fidc@brltrust.com.br, ti.developers@apexgroup.com", // Cessão
                notificarPagamentoComplementar: "cessao_fidc@brltrust.com.br, processamento.fidc@apexgroup.com, frank.moreira@apexgroup.com, paulo.moraes@apexgroup.com, levi.avelar@apexgroup.com, ti.developers@apexgroup.com", // Cessão
            },

            schema: {
                input: 'cessaoPrecatorio',
                output: 'cessaoPrecatorioRetorno'
            },
        }
    }
}
