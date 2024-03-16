import path from "path";

export function gerarNomePDF(config: {tituloPDF:string, numeroTitulo:number, autor:string }, arquivoPDF: {gerarNome:boolean, nomeDefinido:string}, diretorio:string) {

    if(arquivoPDF.gerarNome){
        return path.join(__dirname, diretorio, `${config.tituloPDF.toUpperCase()}${config.numeroTitulo} ${config.autor.toUpperCase()}.pdf`)
    }
    else {
        return path.join(__dirname, diretorio, `${arquivoPDF.nomeDefinido.toUpperCase()}_${config.numeroTitulo}.pdf`)
    }
}
