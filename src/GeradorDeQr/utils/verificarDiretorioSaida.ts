import path from 'path';
import fs from 'fs';
import {consolePastaExiste, consolePastaVazia, iniciar} from './logs/consoleLogs';

export async function validarProjeto(diretorio) {

    iniciar()

    const diretorioSaida = path.join(__dirname, diretorio);

    if (!fs.existsSync(diretorioSaida)) {
        await fs.promises.mkdir(diretorio, { recursive: true });

        consolePastaVazia()
    }

    else {
        consolePastaExiste()
    }
}
