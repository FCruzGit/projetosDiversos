// Informações para geração do QR Code
import {QRCodeRenderersOptions} from 'qrcode';
import {PngConfig} from 'canvas';

export interface definicoesProjeto {

    diretoriosProjeto: diretoriosProjeto

    conversaoB64: boolean,

    gerarGIF: boolean
}

export interface diretoriosProjeto {

    saidaArquivoB64: string,

    saidaArquivoTemp: string,

    saidaArquivoFinal: string,
}

export interface instrucoesPadrao extends QRCodeRenderersOptions {

    instrucoesQRCode: {

        url: string,

        PngConfig: PngConfig
    }
}

export const configuracoesQRCode: instrucoesPadrao = {

    margin: 0.5, // Tamanho da margem ao redor do QR Code

    width: 250, // Tamanho em Pixels da Imagem

    errorCorrectionLevel: 'H', // Nivel de tenacidade do QrCode

    maskPattern: 7, // Altera a formatação dos pixels

    color: {

        light: "#00000000", // Cor de Fundo

        dark: "#000000" // Cor dos dados
    },

    instrucoesQRCode: {

        url: "www.google.com", // Endereço do QR Code

        PngConfig: {

            compressionLevel: 0, // Compressão da Imagem
        }
    }
}

export const definicoesProjeto: definicoesProjeto = {

    diretoriosProjeto: {

        saidaArquivoTemp: '../../../src/GeradorDeQr/SaidaArquivo/temporario',

        saidaArquivoFinal:'../../../src/GeradorDeQr/SaidaArquivo/arquivosConcluidos',

        saidaArquivoB64: "../../../src/GeradorDeQr/SaidaArquivo/arquivosB64"
    },

    conversaoB64: true,

    gerarGIF: false
}
