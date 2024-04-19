import {gerarImagemQr} from '../utils/gerarImagemQRC';
import {gerarCodigoB64} from '../utils/gerarCodigoB64';
import {verificarDiretorioSaida} from '../utils/verificarDiretorioSaida';
import {configuracoesQRCode, definicoesProjeto} from '../config';
import {gerarMultiplos} from './gerarMultiplos';
import {iniciar} from '../utils/logs/consoleLogs';
import {gerarGIF} from './gerarGIF';

/**
 * Função para Gerar QR Code
 *
 * No arquivo config.ts estão os parametros ajustaveis do Arquivo
 *
 */
(async function gerarQRC() {

    await verificarDiretorioSaida()

    // Converte a imagem em GIF

    gerarGIF()

})();
