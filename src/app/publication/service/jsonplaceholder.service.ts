import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {
  private BASE_USER = 'https://jsonplaceholder.typicode.com/users/';
  private  BASE_PUBLIC = 'https://jsonplaceholder.typicode.com/posts/';
  private BASE_COMM = 'https://jsonplaceholder.typicode.com/comments';

  constructor(
    private http: HttpClient
  ) { }

  public getUser() {
    return this.http.get<any>(this.BASE_USER);
}
  public getPublic() {
    return this.http.get<any>(this.BASE_PUBLIC);
  }
  public getComm() {
    return this.http.get<any>(this.BASE_COMM);
  }
}
