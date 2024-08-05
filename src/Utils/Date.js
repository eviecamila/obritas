class DateSP {
    constructor() {
        this.months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
    }

    fecha(date) {
        let fecha = date.split('-');
        fecha[0] = fecha[0].padStart(4, '0');
        fecha[1] = fecha[1].padStart(2, '0');
        fecha[2] = fecha[2].padStart(2, '0');

        let year = fecha[0];
        let month = this.months[parseInt(fecha[1], 10) - 1];
        let day = fecha[2];

        return `${day} de ${month} del ${year}`;
    }
}
const Fecha = ({ date }) => {
    const dateFormatter = new DateSP();
    const formattedDate = dateFormatter.fecha(date);
    return (<>{formattedDate}</>);
};
export default Fecha;