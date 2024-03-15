// Informações para geração do QR Code

interface qrConfig {
    url:string,
    options: string,
    altura: number,
    largura: number
}
export const qrConfig = {
    url: "www.google.com",
    options: "",
    altura: 300,
    largura: 300
};

export const diretorio = {
    saida: "../../../src/GeradorDeQr/SaidaArquivo"
}
