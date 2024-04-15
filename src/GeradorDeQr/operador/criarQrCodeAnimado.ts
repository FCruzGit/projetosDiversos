import {definicoesProjeto} from '../config';
import {consoleQRCtoGIF, desativadoQRCtoGIF} from '../utils/logs/consoleLogs';

export function gerarQRCAnimado() {

    if (definicoesProjeto.gerarGIF) {



        consoleQRCtoGIF()
    }

    else {
        desativadoQRCtoGIF()
    }
}
