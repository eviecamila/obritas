// src/components/MainContent.js
import CardComponent from "./ui/CardComponent";

const ObrasMainContent = () => {
  const arts = [
    {
      titulo: "El Hombre de Vitruvio",
      descripcion: "Estudio de las proporciones del cuerpo humano por Leonardo da Vinci",
      yr_creacion: "1490-01-01",
      fecha_alta: "2023-01-01",
      terminada: true,
      id_area: 1,
      id_proyecto: 1,
      id: 1,
      imagen: "https://steamuserimages-a.akamaihd.net/ugc/1816662225291409821/B0E2A6B18707EB1D7DEA282DDABEC3CF1948EB22/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      estilos: [3, 2, 4],
      metodos: [3, 2],
      autores: [1, 2, 3]
    }
  ];

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {arts.map((art) => (
          <CardComponent
            key={art.id}
            title={art.titulo}
            description={art.descripcion}
            yr_creacion={art.yr_creacion}
            fecha_alta={art.fecha_alta}
            terminada={art.terminada}
            estilos={art.estilos}
            metodos={art.metodos}
            autores={art.autores}
          />
        ))}
      </div>
    </main>
  );
};

export default ObrasMainContent;
