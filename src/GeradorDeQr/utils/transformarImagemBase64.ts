import {definicoesProjeto} from '../config';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import {consoleQRCtoB64, desativadoQRCtoB64} from './logs/consoleLogs';

export function gerarCodigoB64(tela: any): any {

    if (definicoesProjeto.conversaoB64) {

        // Gera o equivalente da imagem em base 64
        const imagemConvertida: string = tela.toDataURL().split(';base64,').pop();

        const nomeArquivoB64 = `base64Code_${moment().format('YYYY-MM-DDTHH-mm-ss')}.txt`;

        fs.writeFileSync(path.join(__dirname, definicoesProjeto.diretoriosProjeto.saidaArquivoFinal, nomeArquivoB64), imagemConvertida);

        consoleQRCtoB64()
    }

    else {
        desativadoQRCtoB64()
    }
}

