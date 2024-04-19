
export function estilizarGIF(){

    const semFundo = {

        light: "#00000000",

        dark: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
    }

    const gerarCorAleatoria = {

        light: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase(),

        dark: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
    }

    return semFundo
}
