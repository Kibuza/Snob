export interface Follow extends FollowForm {
    _id: string;
    usuario?: any; //Esto es para poder insertar un objeto usuario entero aquí
}

export interface FollowForm {
    id_usuario: string;
    id_usuarios_seguidos: string[];
}