import fs from 'fs';
import path from 'path';

export const outputDir = path.join(__dirname, '../../../src/GeradorDePDF/saidaArquivo');

export async function verificarDiretorioSaida() {
    if (!fs.existsSync(outputDir)) {
        await fs.promises.mkdir(outputDir, { recursive: true });
    }
}
