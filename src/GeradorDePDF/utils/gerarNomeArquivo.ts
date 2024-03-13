import path from 'path';
import {diretorioSaida} from './verificarDiretorioSaida';
import {nomeArquivoPDF, pdfConfig} from '../config';

export function gerarNomePDF() {
    if(nomeArquivoPDF.nomeDinamico){
        return path.join(diretorioSaida, `${pdfConfig.title}${pdfConfig.chamadoNumero} ${pdfConfig.author.toUpperCase()}.pdf`)
    }
    else {
        return path.join(diretorioSaida, `${nomeArquivoPDF.nomeArquivo}_${pdfConfig.chamadoNumero}.pdf`)
    }
}
