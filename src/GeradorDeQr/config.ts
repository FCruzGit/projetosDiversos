// Informações para geração do QR Code

export const configuracoes = {

    QRC: {

        url: "www.google.com", // Endereço do QR Code

        compressionLevel: 0, // Compressão da Imagem

        margin: 0.5, // Tamanho da margem ao redor do QR Code

        width: 250, // Tamanho em Pixels da Imagem

        errorCorrectionLevel: 'H', // Nivel de tenacidade do QrCode

        maskPattern: 7, // Altera a formatação dos pixels

        color:  {

            light: "#00000000", // Cor de Fundo

            dark: "#000000" // Cor dos dados
        },
    },

    projeto: {
        opcoes: {
            gerarQRC: {
                quantidade: "number",
                estilo: "campo vai entregar varios tipos de coloração inclusive random e gif"
            },
            converterQRCtoBase64: "boolean"
        },
        diretorioArquivos: ""
    }
}
