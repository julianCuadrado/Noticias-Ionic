import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage';
import { NoticiasService } from '../services/noticias.service';

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
  list: any[] = [];
  articulos:any[]=[];
  @ViewChild(IonSegment) segmento: IonSegment;

  constructor(private serve:NoticiasService, private iab:InAppBrowser, private social: SocialSharing,
    private actionSheetController: ActionSheetController, private storage: Storage, private aler: AlertController) {}

  public ngOnInit(){}

  sliderOption ={
    slidesPerView:3,
    speed: 400
  }
  
  segmentChanged(event){
    const valorSegmento = event.detail.value;
    this.serve.getNoticias(valorSegmento).subscribe(
      data =>{
        this.obj = data;
        this.articulos = data.articles;
      }
    );    
  }

  abrirPagina(url){
    this.iab.create(url,'_blank');
  }


  public setValue(key: string, value: any) {
    this.storage.set(key, value).then(() => {
    });
  }
  async alerta(title) {
    const alert = await this.aler.create({
      header: 'Favorites',
      message: "Added news: " + "'" + title + "'",
      buttons: ['OK']
    });
    await alert.present();
  }

  async  openActionsSheet(url, title, articulo) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Ver',
          icon: 'ios-eye',
          handler: () => {
            this.iab.create(url, '_blank');
          }
        },
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            this.openActionsShared(url, title);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  async  openActionsShared(url, title) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share',
      buttons: [
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.social.shareViaTwitter('News: ' + title, null, url).then(() => {
            }).catch(e => {
              this.iab.create('https://play.google.com/store/apps/details?id=com.twitter.android', '_blank');
            });
          }
        },
        {
          text: 'Email',
          icon: 'mail',
          handler: () => {
            this.social.shareViaEmail(url, 'News: ' + title, null).then(() => {
            }).catch(() => {
              alert("Install gmail");
            });
          }
        },
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.social.shareViaFacebook('News: ' + title, null, url).then(() => {

            }).catch(() => {
              this.iab.create('https://play.google.com/store/apps/details?id=com.facebook.katana', '_blank');
            });
          }
        },
        {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.social.shareViaWhatsApp('News: ' + title, null, url).then(() => {

            }).catch(() => {
              this.iab.create('https://play.google.com/store/apps/details?id=com.whatsapp', '_blank');
            });
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }
}