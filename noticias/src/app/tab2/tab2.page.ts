import { Component, ViewChild } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  categorias: any[] = [{nombre:'General', valor:'general'},
                      {nombre:'Business', valor:'business'},
                      {nombre:'Entertainment', valor:'entertainment'},
                      {nombre:'Health', valor:'health'},
                      {nombre:'Science', valor:'science'},
                      {nombre:'Sports', valor:'sports'},
                      {nombre:'Technology', valor:'technology'}];
  obj:any;
  listaG:any[]=[];
  lista:any[]=[];
  @ViewChild(IonSegment) segmento: IonSegment;

  constructor(private cate:CategoriasService) {}

  public ngOnInit(){
    this.getCate();
    this.segmento.value = 'general';
  }

  sliderOption ={
    slidesPerView:3,
    speed: 400
  }

  getCate(){
    this.cate.getCategorias().subscribe(
      data =>{
        this.obj = data;
        this.listaG = this.obj.sources;
        this.obtenerCategoria('general');
      }
    );
  }

  obtenerCategoria(segmento){
    this.lista = [];
    for (let i = 0; i < this.listaG.length; i++) {
      if(this.listaG[i].category === segmento){
        this.lista.push(this.listaG[i]);
      }
    }
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
    this.obtenerCategoria(valorSegmento);
  }
}