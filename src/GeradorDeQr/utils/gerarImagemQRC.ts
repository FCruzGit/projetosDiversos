import {Canvas, createCanvas} from 'canvas';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import {consoleQRCGerado} from './logs/consoleLogs';


// Renderiza uma tela de QR Code como imagem JPG
export async function gerarImagemQRC(pathSaida, config, indexArquivo?: number){

    const tela: Canvas = createCanvas(100,100);

    await QRCode.toCanvas(tela, config);

    const buffer = tela.toBuffer('image/png', config);

    fs.writeFileSync(path.join(__dirname, pathSaida, `qr_code_${indexArquivo}.png`), buffer);

    consoleQRCGerado()

    return tela;

}
