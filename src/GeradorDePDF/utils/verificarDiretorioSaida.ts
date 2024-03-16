import fs from 'fs';
import path from 'path';

export async function verificarDiretorioSaida(diretorioSaida:string) {

    const diretorio = path.join(__dirname, diretorioSaida);

    if (!fs.existsSync(diretorio)) {
        await fs.promises.mkdir(diretorio, { recursive: true });
    }
}
