import {gerarImagemQr} from '../utils/gerarImagemQr';
import {extrairBase64DoCanvas} from '../utils/transformarImagemBase64';
import {verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {diretorio, qrConfig, qrInstruction} from '../config';

/**
 * Função para Gerar QR Code
 *
 * No arquivo config.ts estão os parametros ajustaveis do Arquivo
 *
 */
(async function gerarQrCode() {

    // Verifica se o diretório de Saida existe
    await verificarDiretorioSaida(diretorio.saida)

    // Cria a imagem do QR Code
    const imagemQrCode = await gerarImagemQr(diretorio.saida, qrInstruction, qrConfig)

    // Converte a imagem em dados base64
    const base64Image = extrairBase64DoCanvas(imagemQrCode)

})();
