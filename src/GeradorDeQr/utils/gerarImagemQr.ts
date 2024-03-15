import {createCanvas} from 'canvas';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

// Renderiza uma tela de QR Code como imagem
export async function gerarImagemQr(caminho: string, qrConfig: { altura: number, largura: number, url: string }){

    const tela = createCanvas(qrConfig.altura, qrConfig.largura);
    await QRCode.toCanvas(tela, qrConfig.url);

    const buffer = tela.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, caminho, 'qr_code.png'), buffer);

    return tela;

}
