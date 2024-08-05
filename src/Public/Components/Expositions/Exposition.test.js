const defaultData = {
    nombre: "Exposición de Postimpresionismo",
    descripcion: "Una muestra de obras postimpresionistas.",
    fecha_inicio: "2024-05-01",
    fecha_fin: "2024-06-01",
    imagen: "http://localhost:8000/exposiciones/img/1",
    id: 1,
    obras: {
        obras: [
            {
                titulo: "Obra confleis",
                descripcion: "Descripción de la obra 2",
                yr_creacion: "2023-01-01",
                fecha_alta: "2023-01-01",
                terminada: false,
                id_area: 1,
                id_proyecto: 1,
                id: 1,
                imagenes: [
                    "https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                ],
                video: "https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
                estilos: [2, 11, 6],
                metodos: [4, 5],
                autores: [1, 4, 5, 8, 16]
            }
        ],
        estilos: {
            "2": {
                id: 2,
                nombre: "Gog gog"
            },
            "11": {
                id: 11,
                nombre: "Anime"
            },
            "6": {
                id: 6,
                nombre: "Arte Pop"
            }
        },
        metodos: {
            "4": {
                id: 4,
                nombre: "Arte Digital"
            },
            "5": {
                id: 5,
                nombre: "Lapiz y Papel"
            }
        },
        autores: {
            "1": {
                id: 1,
                nombre: "ay mi gatitaaa"
            },
            "4": {
                id: 4,
                nombre: "Pablo Picasso"
            },
            "5": {
                id: 5,
                nombre: "Diego Velázquez"
            },
            "8": {
                id: 8,
                nombre: "Gustav Klimt"
            },
            "16": {
                id: 16,
                nombre: "momopache"
            }
        }
    }
};

export default defaultData;