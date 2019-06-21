import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { NoticiasService } from '../services/noticias.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  obj: any;
  articulos: any[] = [];
  list: any[] = [];

  constructor(private noticias: NoticiasService, private iab: InAppBrowser, private social: SocialSharing,
    private actionSheetController: ActionSheetController, private storage: Storage, private aler: AlertController) { }

  public ngOnInit() {
    this.getNoticias();
  }

  doRefresh(event) {
    this.getNoticias();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  getNoticias() {
    this.noticias.getNoticias('').subscribe(
      data => {
        this.obj = data;
        this.articulos = this.obj.articles;
      }
    );
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
          text: 'Favoritos',
          icon: 'ios-star-outline',
          handler: () => {
            this.list.push(JSON.stringify(articulo));
            this.setValue('lista', JSON.stringify(this.list));
            this.alerta(title);
          }
        }, {
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
