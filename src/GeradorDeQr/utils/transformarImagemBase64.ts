export function extrairBase64DoCanvas(tela: any): string {
    return tela.toDataURL().split(';base64,').pop();
}

