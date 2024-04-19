// Pagina de Configuração

import {configEsteira} from './parametros';

export const configuracaoEsteira: configEsteira = {

    diretorioSaida: "../../../src/GerarArquivoBPM/SaidaArquivoBPM",
    operacao: {
        tipo: "" // CESSÃO | LIQUIDAÇÃO | CADASTRO
    },
    fundo: {
        tipo: "", // FIDC | FIM | FIP
        nome: "",
        identificacao: 0,

        var: {
            acronimo: "", // esse campo tambem serve para o Id do Bpm
            webhook: "",
            sftpOutput: "",

            email: {
                tarefaPadrao: "",
                notificarPendenciaLastro: "", // Preencher se necessario apenas Cessões
                notificarPagamentoComplementar: "", // Preencher se necessario apenas Cessões
            },

            schema: {
                input: "",
                output: ""
            },
        }
    }
}
