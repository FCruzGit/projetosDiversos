// Parametros Gerais

export type fundoTipo = 'FIDC' | 'FIM' | 'FIP'| '' ;
export type tipoOperacao = 'CESSÃO' | 'LIQUIDAÇÃO' | 'CADASTRO' | '' ;
export type input = 'baixaPrecatorio' | 'baixaPadrao' | 'cessaoPrecatorio' | 'cessaoPadrao' | 'cadastroPrecatorio' | 'cadastroPadrao' | '' ;
export type output = 'baixaPrecatorioRetorno' | 'baixaPadraoRetorno' | 'cessaoPrecatorioRetorno' | 'cessaoPadraoRetorno' | 'cadastroPrecatorioRetorno' | 'cadastroPadraoRetorno' | '' ;

export interface configEsteira {

    diretorioSaida: string,
    operacao: {
        tipo: tipoOperacao
    }
    fundo: {
        tipo: fundoTipo,
        nome: string,
        identificacao: number,

        var: {
            acronimo: string,
            emails: string
            sftpOutput: string,

            schema: {
                input: input,
                output: output
            }
        }
    }
}

export const parametroBaixa = {
    "schemas": {
        "entrada": {
            'padrao': '',
            'precatorio': 'https://schemas.brltrust.com.br/json/fidc/v1.2/precatorios/cessao.schema.json'
        },
        "saida": {
            'padrao': '',
            'precatorio': 'https://schemas.brltrust.com.br/json/fidc/v1.2/precatorios/cessao-retorno.schema.json'
        }
    },
    "varOriginal": "S(arquivo)",
}

export const parametrosValidacao = {
    "status": {
        "naoCapturada": 'S(resultado).prop("codigo").stringValue() != "CAPTURADA"',
        "reprovada": "",
        "cancelada": ""
    }
};
