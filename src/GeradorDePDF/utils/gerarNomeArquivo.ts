import path from 'path';
import {nomeArquivoPDF, pdfConfig} from '../config';
import {diretorio} from './verificarDiretorioSaida';

export function gerarNomePDF() {
    if(nomeArquivoPDF.nomeDinamico){
        return path.join(diretorio, `${pdfConfig.title}${pdfConfig.chamadoNumero} ${pdfConfig.author.toUpperCase()}.pdf`)
    }
    else {
        return path.join(diretorio, `${nomeArquivoPDF.nomeArquivo}_${pdfConfig.chamadoNumero}.pdf`)
    }
}
