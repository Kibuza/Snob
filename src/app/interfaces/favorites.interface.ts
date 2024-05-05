export interface Favorite extends FavoriteForm {
    _id: string;
    usuario?: any; //Esto es para poder insertar un objeto usuario entero aquí
}

export interface FavoriteForm {
    id_usuario: string;
    id_peliculas_favoritas: string[];
}