//Funcion para agregar lazy al llamado de la api
const lazyLoad = (url) => { return `${url}?lazy=1` };
//Funcion para hacer delay
const sleep = (seconds) => { setTimeout(() => { }, seconds * 1000); }


//EXPORT, al implementar algo, añadirlo aqui
const GlobalService = {
    lazyLoad,
    sleep
};
export default GlobalService;