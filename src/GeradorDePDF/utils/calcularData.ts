const agora = new Date();
export const data = {
    dia: agora.getDate(),
    mes: MesPorExtenso(agora.getMonth() + 1),
    hora: `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`
};

export function MesPorExtenso(mes: number): string {
    const meses = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];
    return meses[mes - 1];
}

export function processarTemplate(configContent: string): string {
    let dataAtualHTML = configContent.replace(/\${data.dia}/g, data.dia.toString());
    dataAtualHTML = dataAtualHTML.replace(/\${data.mes}/g, data.mes);
    dataAtualHTML = dataAtualHTML.replace(/\${data.hora}/g, data.hora);

    return dataAtualHTML;
}
