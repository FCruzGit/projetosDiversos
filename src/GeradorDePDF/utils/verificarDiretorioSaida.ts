import fs from 'fs';
import path from 'path';

export const diretorioSaida = path.join(__dirname, '../../../src/GeradorDePDF/saidaArquivo');

export async function verificarDiretorioSaida() {
    if (!fs.existsSync(diretorioSaida)) {
        await fs.promises.mkdir(diretorioSaida, { recursive: true });
    }
}
