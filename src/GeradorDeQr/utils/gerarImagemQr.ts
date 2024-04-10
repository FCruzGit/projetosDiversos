import {createCanvas} from 'canvas';
import fs from 'fs';
import path from 'path';
import QRCode, {QRCodeRenderersOptions} from 'qrcode';
import {qrInstruction} from '../config';

// Renderiza uma tela de QR Code como imagem
export async function gerarImagemQr(caminho: string, instrucoesQrCode: qrInstruction, qrConfig: QRCodeRenderersOptions){

    const tela = createCanvas(100,100);

    QRCode.toCanvas(tela, instrucoesQrCode.url, qrConfig);
s
    const buffer = tela.toBuffer('image/png', qrInstruction.PngConfig);
    fs.writeFileSync(path.join(__dirname, caminho, 'qr_code.png'), buffer);

    return tela;

}
