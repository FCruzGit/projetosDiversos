import path from 'path';
import fs from 'fs';
import {configEsteira} from '../utils/parametros';

export async function verificarDiretorioBPM(diretoriosAnalisar: configEsteira) {

    const diretorio = path.join(__dirname, diretoriosAnalisar.diretorioSaida);

    if (!fs.existsSync(diretorio)) {
        await fs.promises.mkdir(diretorio, { recursive: true });
        console.log("Diretorio de Saida Criado\n")
    }
}
