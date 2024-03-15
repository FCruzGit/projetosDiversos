import fs from 'fs';
import path from 'path';
import {diretorioSaida} from '../config';

export const diretorio = path.join(__dirname, diretorioSaida.dirSaida);

export async function verificarDiretorioSaida() {
    if (!fs.existsSync(diretorio)) {
        await fs.promises.mkdir(diretorio, { recursive: true });
    }
}
