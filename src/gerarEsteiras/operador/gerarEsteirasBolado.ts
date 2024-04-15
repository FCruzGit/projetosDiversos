// Codigo Principal para gerar os BPMs

import {configuracaoEsteira} from '../utils/configuracao';
import {verificarDiretorioBPM} from './verificarDiretorioSaida';
import {gerarArquivoBPM} from './gerarArquivoBPM';
import {selecionarTemplate} from './selecionarTemplate';

/**
 * Função de Criar BPMN Padrão Apex Flow
 */
(async function gerarBPM() {

    const arquivoXML = selecionarTemplate(configuracaoEsteira);

    await verificarDiretorioBPM(configuracaoEsteira);

    await gerarArquivoBPM(arquivoXML, configuracaoEsteira);

})();

