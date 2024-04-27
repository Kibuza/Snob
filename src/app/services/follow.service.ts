import { Injectable } from '@angular/core';
import { followRequest } from '../follow/followRequest';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ServerURLService } from './server-url.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private _followUrl = this.serverUrl.getServerUrl() + "/api/follows";
  constructor(private http:HttpClient, private serverUrl: ServerURLService) { }

  newFollow(follow:followRequest){
    return this.http.post<any>(this._followUrl, follow);
  }

  getFollows(id:string){
    return this.http.get<any>(this._followUrl + "/" + id);
  }
}
