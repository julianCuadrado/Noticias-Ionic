import { Component } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  obj:any;
  articulos:any[]=[];

  constructor(private noticias:NoticiasService) {}

  public ngOnInit(){
    this.getNoticias();
  }
  getNoticias(){
    this.noticias.getNoticias().subscribe(
      data =>{
        this.obj = data;
        this.articulos = this.obj.articles;
      }
    );
  }
}
