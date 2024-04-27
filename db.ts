const mongoose = require('moongose');
import { environment } from "./environment";

export async function connectToDatabase() {
    const user = environment.user;
    const password = environment.password;
    const db = environment.db;
  
    const URI = `mongodb+srv://${user}:${password}@cluster-snob.qbisih0.mongodb.net`;
  
    try {
      await mongoose.connect(URI);
      console.log('Conectado a la base de datos');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }