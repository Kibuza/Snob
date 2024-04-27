import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { reviewRequest } from '../peliculas/review/reviewRequest';
import { ServerURLService } from './server-url.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private _registerUrl = this.serverUrl.getServerUrl() + "/api/reviews";
  constructor(private http:HttpClient, private serverUrl: ServerURLService) { }

  //Saca las reviews por la id de la película
  getReviews(id:number){
    return this.http.get<any>(this._registerUrl + "/" + id);
  }

  //Saca las reviews por el id del usuario
  getReviewByUserId(id:string){
    return this.http.get<any>(this._registerUrl + "/user/" + id);
  }
  registerReview(review:reviewRequest){
    return this.http.post<any>(this._registerUrl, review);
  }
  deleteReview(id_review:string){
    return this.http.delete<any>(this._registerUrl + "/" + id_review);
  }

}
