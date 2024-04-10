// Informações para geração do QR Code
import {QRCodeRenderersOptions} from 'qrcode';
import {PngConfig} from 'canvas';

type tipoQr = "pdf" | "svg" | undefined

export interface qrInstruction {

    url: string,

    tipoQr: tipoQr,

    PngConfig: PngConfig
}

export const qrConfig: QRCodeRenderersOptions = {

    margin: 1,

    scale: 5,

    width: 250,

    errorCorrectionLevel: 'H', // Nivel de tenacidade do QrCode

    maskPattern: 1, // Altera a formatação dos pixels

    color: {
        dark: "#000000"
    }
}

export const qrInstruction: qrInstruction = {

    url: "www.google.com",

    tipoQr: 'svg',

    PngConfig: {

        compressionLevel: 9,

        backgroundIndex: 1,

        resolution: 1
    }
};

export const diretorio = {
    saida: "../../../src/GeradorDeQr/SaidaArquivo"
}
