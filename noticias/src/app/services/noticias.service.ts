import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';

export interface Source{
  id?:string;
  name:string;
}

export interface Articles{
  author?:string;
  content?:string;
  description:string;
  publishedAt:string;
  source:Source;
  title:string;
  url:string;
  urlToImage:string;
}

export interface Respuesta{
  articles:Articles[];
  status: string;
  totalResults:number;
}

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  constructor(private http:HttpClient) { }

  getNoticias(categoria:string){
    return this.http.get<Respuesta>('https://newsapi.org/v2/top-headlines?country=us&category='+categoria+'&apiKey='+environment.apiKey);
  }
}
