import path from 'path';
import fs from 'fs';
import {diretoriosProjeto} from '../config';
import {consolePastaExiste, consolePastaVazia} from './logs/consoleLogs';

export async function verificarDiretorioSaida(diretoriosAnalisar: diretoriosProjeto) {

    const diretorioB64 = path.join(__dirname, diretoriosAnalisar.saidaArquivoB64);
    const diretorioTemp = path.join(__dirname, diretoriosAnalisar.saidaArquivoTemp);
    const diretorio = path.join(__dirname, diretoriosAnalisar.saidaArquivoFinal);

    if (!fs.existsSync(diretorioB64)) {
        await fs.promises.mkdir(diretorioB64, { recursive: true });

        consolePastaVazia()
    }

    if (!fs.existsSync(diretorioTemp)) {
        await fs.promises.mkdir(diretorioTemp, { recursive: true });

        consolePastaVazia()
    }

    if (!fs.existsSync(diretorio)) {
        await fs.promises.mkdir(diretorio, { recursive: true });

        consolePastaVazia()
    }

    else {
        consolePastaExiste()
    }
}
