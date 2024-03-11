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
