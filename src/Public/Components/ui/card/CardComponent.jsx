// src/components/CardComponent.js
import { Card, CardHeader, CardTitle, CardContent } from './Card';

const CardComponent = ({ title, description, yr_creacion, fecha_alta, terminada, estilos, metodos, autores }) => {
  return (
    <Card>
      <img
        src="/placeholder.svg"
        alt="Cover image"
        width={1200}
        height={600}
        className="aspect-[2/1] w-full rounded-t-lg object-cover"
      />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold mt-4">Descripción</div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="text-xl font-bold mt-4">Año de Creación</div>
        <p className="text-sm text-muted-foreground">{yr_creacion}</p>
        <div className="text-xl font-bold mt-4">Fecha de Alta</div>
        <p className="text-sm text-muted-foreground">{fecha_alta}</p>
        <div className="text-xl font-bold mt-4">Terminada</div>
        <p className="text-sm text-muted-foreground">{terminada ? 'Sí' : 'No'}</p>
        <div className="text-xl font-bold mt-4">Estilos</div>
        <p className="text-sm text-muted-foreground">{estilos.join(', ')}</p>
        <div className="text-xl font-bold mt-4">Métodos</div>
        <p className="text-sm text-muted-foreground">{metodos.join(', ')}</p>
        <div className="text-xl font-bold mt-4">Autores</div>
        <p className="text-sm text-muted-foreground">{autores.join(', ')}</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
