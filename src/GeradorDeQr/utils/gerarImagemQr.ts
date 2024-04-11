import {createCanvas} from 'canvas';
import fs from 'fs';
import path from 'path';
import QRCode, {QRCodeRenderersOptions} from 'qrcode';
import {diretoriosProjeto, instrucoesPadrao} from '../config';
import {consoleQRCGerado} from './logs/consoleLogs';


// Renderiza uma tela de QR Code como imagem JPG
export async function gerarImagemQr(caminho: diretoriosProjeto, configuracoesImagem: instrucoesPadrao){

    const tela = createCanvas(1000,1000);

    await QRCode.toCanvas(tela, configuracoesImagem.instrucoesQRCode.url, configuracoesImagem);

    const buffer = tela.toBuffer('image/png', configuracoesImagem.instrucoesQRCode.PngConfig);

    fs.writeFileSync(path.join(__dirname, caminho.saidaArquivoFinal, 'qr_code.png'), buffer);

    consoleQRCGerado()

    return tela;

}
