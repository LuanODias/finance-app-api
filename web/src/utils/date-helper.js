export const formatDateForAPI = (dateString) => {
    const [year, month, day] = dateString.split('-')

    // Cria uma data em UTC forçando o horário para 12:00 (Meio-dia).
    // MOTIVO: Ao definir meio-dia, garantimos que qualquer conversão de fuso horário (ex: Brasil -3h ou +3h)
    // ainda caia no mesmo dia (9h da manhã ou 15h da tarde), evitando que a data "volte" para o dia anterior.
    // O "+1" no dia é um ajuste adicional de segurança para compensar peculiaridades de conversão de alguns bancos de dados.
    const dateToSend = new Date(
        Date.UTC(Number(year), Number(month) - 1, Number(day) + 1, 12),
    )

    return dateToSend.toISOString()
}

export const formatDateForInput = (isoDate) => {
    // Recebe uma data ISO (vindo do banco) e formata para "YYYY-MM-DD"
    // Usamos 'en-CA' pois é o padrão internacional que o input type="date" espera (Ano-Mês-Dia).
    return new Date(isoDate).toLocaleDateString('en-CA')
}
