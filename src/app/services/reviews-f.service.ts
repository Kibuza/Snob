import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { Review, ReviewForm } from '../interfaces/reviews.interface';

const PATH = 'reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsFService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor() { }

  //Saca todas las reviews
  getReviews() {
    return collectionData(this._collection, {idField: 'id'}).pipe(take(1)) as Observable<Review[]>; // Agrega 'take(1)' aquí
  }

  //Saca reviews de una película concreta
  async getReviewsByMovie(id: string) {
    const q = query(this._collection, where('id_pelicula', '==', id));
    const querySnapshot = await getDocs(q);
    let reviews: Review[] = [];

    querySnapshot.forEach((doc) => {
      const reviewData = doc.data() as Review;
      const reviewWithId: Review = { ...reviewData, _id: doc.id }; //Esto es para incluir la id en el objeto que devuelve
      reviews.push(reviewWithId);
    });

    return reviews;
  }

    //Saca reviews de un usuario concreto
    async getReviewsByUserId(id: string) {
      const q = query(this._collection, where('id_usuario', '==', id));
      const querySnapshot = await getDocs(q);
      let reviews: Review[] = [];
  
      querySnapshot.forEach((doc) => {
        const reviewData = doc.data() as Review;
        const reviewWithId: Review = { ...reviewData, _id: doc.id }; //Esto es para incluir la id en el objeto que devuelve
        reviews.push(reviewWithId);
      });
  
      return reviews;
    }

  //Saca una review por su id
  async getReview(id: string) {
    try {
      const document = doc(this._collection, id);
      const snapshot = await getDoc(document);
      return snapshot.data() as ReviewForm;
    } catch (error) {
      console.log('Error getting document:', error);
      return undefined;
    }
  }

  createReview(review : ReviewForm){
    return addDoc(this._collection, review);
  }

  updateReview(id:string, review: ReviewForm){
    const document = doc(this._collection, id);
    return updateDoc(document, {...review});
  }

  deleteReview(id:string){
    const document = doc(this._collection, id);
    return deleteDoc(document);
  }
  
}
