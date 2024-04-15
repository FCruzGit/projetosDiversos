import {templateBaixaPrecatorio} from '../template/templateBaixaPrecatorio';
import {configEsteira} from '../utils/parametros';
import {configuracaoEsteira} from '../utils/configuracao';

export function selecionarTemplate(config: configEsteira): any {
    const tipoEsteira = config.fundo.var.schema.input
    const selecionarTemplate: any = {

        baixaPadrao: '',
        baixaPrecatorio: templateBaixaPrecatorio(configuracaoEsteira),
        cessaoPadrao: '',
        cessaoPrecatorio: '',

    };

    return selecionarTemplate[tipoEsteira] || console.log("Erro ao adicionar template");
}

