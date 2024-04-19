import {definicoesProjeto, instrucoesPadrao} from '../config';
import {consoleQRCtoGIF, desativadoQRCtoGIF} from '../utils/logs/consoleLogs';
import {gerarImagemQr} from '../utils/gerarImagemQRC';
import {colorirGIF} from './colorirGIF';
import {estilizarGIF} from './estilizarGIF';

export function gerarMultiplos(definicoes: definicoesProjeto, instrucoes: instrucoesPadrao) {

    if (definicoes.gerarGIF) {

        for (let i = 1; i <= 10; i++) {

            const estiloGIF: any = estilizarGIF()
            const instrucaoCustom: instrucoesPadrao = colorirGIF(estiloGIF, instrucoes)
            gerarImagemQr(definicoes, instrucaoCustom, i)
        }

        consoleQRCtoGIF()
    }

    else {
        desativadoQRCtoGIF()
    }
}
