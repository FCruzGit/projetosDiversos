import {gerarImagemQr} from '../utils/gerarImagemQr';
import {gerarCodigoB64} from '../utils/transformarImagemBase64';
import {verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {configuracoesQRCode, definicoesProjeto} from '../config';
import {gerarQRCAnimado} from './criarQrCodeAnimado';
import {iniciar} from '../utils/logs/consoleLogs';

/**
 * Função para Gerar QR Code
 *
 * No arquivo config.ts estão os parametros ajustaveis do Arquivo
 *
 */
(async function gerarQRC() {

    iniciar()

    // Verifica se o diretório de Saida existe
    await verificarDiretorioSaida(definicoesProjeto.diretoriosProjeto)

    // Cria a imagem do QR Code
    const imagemQRC = await gerarImagemQr(definicoesProjeto.diretoriosProjeto, configuracoesQRCode)

    // Converte a imagem em base 64
    gerarCodigoB64(imagemQRC)

    // Converte a imagem em GIF
    gerarQRCAnimado()

})();
