import path from 'path';
import fs from 'fs';

export async function verificarDiretorioSaida(diretorioArquivos:string) {

    const diretorio = path.join(__dirname, diretorioArquivos);

    if (!fs.existsSync(diretorio)) {
        await fs.promises.mkdir(diretorio, { recursive: true });
    }
}
