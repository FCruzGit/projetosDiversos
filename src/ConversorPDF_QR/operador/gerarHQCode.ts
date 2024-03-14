import {createCanvas} from 'canvas';
const QRCode = require('qrcode');

// Função para gerar o QR Code como imagem
async function gerarQRCode(link: any, outputFilePath: any) {
    try {
        const canvas = createCanvas(200, 200);
        await QRCode.toCanvas(canvas, link);
        const out = require('fs').createWriteStream(outputFilePath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        console.log('QR Code gerado com sucesso!');
    } catch (err) {
        console.error('Erro ao gerar QR Code:', err);
    }
}

const qrCodeConfig = {
    endereco: 'https://www.google.com',
};

gerarQRCode(qrCodeConfig.endereco, 'qrcode.png');


