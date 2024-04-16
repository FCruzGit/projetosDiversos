import {templateBaixaPrecatorio} from '../template/templateBaixaPrecatorio';
import {configEsteira} from '../utils/parametros';
import {configuracaoEsteira} from '../utils/configuracao';
import {templateCessaoPrecatorio} from "../template/templateCessaoPrecatorio";

export function selecionarTemplate(config: configEsteira): any {
    const tipoEsteira = config.fundo.var.schema.input
    const selecionarTemplate: any = {

        baixaPadrao: '',
        baixaPrecatorio: templateBaixaPrecatorio(configuracaoEsteira),
        cessaoPadrao: '',
        cessaoPrecatorio: templateCessaoPrecatorio(configuracaoEsteira),

    };

    return selecionarTemplate[tipoEsteira] || console.log("Erro ao adicionar template / Template não existe");
}

