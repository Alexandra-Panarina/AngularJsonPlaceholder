import { Component, OnInit } from '@angular/core';
import {JsonplaceholderService} from './service/jsonplaceholder.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';


export interface APIData {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
   merged: APIData[] = [];
   isDesc = true;
   selectedItem = null;
   publTitle = '';
   publBody = '';
   commentObj: Comment[] = [];
   isVisDialogComment = false;

  constructor(public jsonplaceholderService: JsonplaceholderService) {}
  ngOnInit() {
    combineLatest( this.jsonplaceholderService.getUser(), this.jsonplaceholderService.getPublic(), this.jsonplaceholderService.getComm())
      .pipe(
        map(([user, pub, comm]) => {
          const temp: APIData[] = [];
          for (const publication of pub) {
            temp.push({
                ...publication,
                user: (user.find((itmInner) => itmInner.id === publication.userId)),
                comments: (comm.filter((itmInner) => itmInner.postId === publication.id))
              }
            );
          }
          this.merged = temp;
        })
      )
      .subscribe();

  }

  public sortPub(category, item) {
      this.merged.sort((a, b) => {
        switch (category) {
          case 'name': return compare(a.user.username, b.user.username, this.isDesc);
          case 'city': return compare(a.user.address.city, b.user.address.city, this.isDesc);
          case 'title': return compare(a.title, b.title, this.isDesc);
          case 'cnt_comm': return compare(a.comments.length, b.comments.length, this.isDesc);
          default: return 0;
        }
    });
      this.selectedItem = item;
      this.isDesc = !this.isDesc;
      this.isVisDialogComment = false;
  }

 public openCommentDialog(publTitle, publBody, publComments) {
    this.publTitle = publTitle;
    this.commentObj = publComments;
    this.publBody = publBody;
    this.isVisDialogComment = true;
  }

  public closeDialogBox() {
    this.isVisDialogComment = false;
  }

}

function compare(a, b, isDesc) {
  return (a < b ? -1 : 1) * (isDesc ? 1 : -1);
}
