export interface Review extends ReviewForm {
    _id: string;
    usuario?: any; //Esto es para poder insertar un objeto usuario entero en la review (para cargar el avatar)
    pelicula?: any; //Esto es para poder insertar un objeto pelicula entero en la review (para cargar el poster)
}

export interface ReviewForm {
    id_usuario: string;
    id_pelicula: string;
    text: string;
}