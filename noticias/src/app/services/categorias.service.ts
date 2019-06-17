import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';

export interface Respuesta{
  sources:Source[];
  status: string;
}

export interface Source{
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }

  getCategorias(){
    return this.http.get<Respuesta>('https://newsapi.org/v2/sources?apiKey='+environment.apiKey);
  }
}
