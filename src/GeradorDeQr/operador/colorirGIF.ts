import {instrucoesPadrao} from '../config';

export function colorirGIF(estilo: any, arquivoInstrucao: instrucoesPadrao): instrucoesPadrao{

    return {

        margin: arquivoInstrucao.margin,

        width: arquivoInstrucao.width,

        errorCorrectionLevel: arquivoInstrucao.errorCorrectionLevel,

        maskPattern: arquivoInstrucao.maskPattern,

        color: estilo,

        instrucoesQRCode: {

            url: arquivoInstrucao.instrucoesQRCode.url,

            PngConfig: {

                compressionLevel: arquivoInstrucao.instrucoesQRCode.PngConfig.compressionLevel,
            }
        }
    }
}
