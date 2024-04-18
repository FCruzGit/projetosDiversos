import {templateBaixaPrecatorio} from '../template/templateBaixaPrecatorio';
import {configEsteira} from '../utils/parametros';
import {configuracaoEsteira} from '../utils/configuracao';
import {templateCessaoPrecatorio} from "../template/templateCessaoPrecatorio";
import {templateCadastroPrecatorio} from '../template/templateCadastroPrecatorio';

export function selecionarTemplate(config: configEsteira): any {

    const tipoEsteira = config.fundo.var.schema.input

    const selecionarTemplate: any = {
        baixaPadrao: 'templateBaixa(configuracaoEsteira)',
        baixaPrecatorio: templateBaixaPrecatorio(configuracaoEsteira),
        cessaoPadrao: 'templateCessao(configuracaoEsteira)',
        cessaoPrecatorio: templateCessaoPrecatorio(configuracaoEsteira),
        cadastroPadrao: 'templateCadastro(configuracaoEsteira)',
        cadastroPrecatorio: templateCadastroPrecatorio(configuracaoEsteira)
    };

    return selecionarTemplate[tipoEsteira] || console.log("Erro ao adicionar template / Template não existe");
}

