import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  articulos: any[] = [];

  constructor(private storage: Storage, private actionSheetController: ActionSheetController, private aler: AlertController) { }

  async alerta(me) {
    const alert = await this.aler.create({
      header: 'Favorites',
      message: me,
      buttons: ['OK']
    });
    await alert.present();
  }


  ionViewWillEnter() {
    this.storage.get('lista').then((val) => {
      if (val !== null) {
        this.articulos = this.convertir(JSON.parse(val));
      } else {
        this.alerta('You have no news added');
      }
    });
  }

  convertir(lista) {
    let lis = [];
    for (let index = 0; index < lista.length; index++) {
      lis.push(JSON.parse(lista[index]));
    }
    return lis;
  }

  public setValue(key: string, value: any) {
    this.storage.set(key, value).then(() => {
    });
  }

  convertir2(lista) {
    let lis = [];
    for (let index = 0; index < lista.length; index++) {
      lis.push(JSON.stringify(lista[index]));
    }
    return lis;
  }

  async  openActionsSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          const alert = await this.aler.create({
            header: 'Confirma',
            message: '¿Realmente desea eliminar este registro?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Si',
                handler: () => {
                  this.articulos.splice(id,1);
                  this.articulos = this.convertir2(this.articulos);
                  this.setValue('lista', JSON.stringify(this.articulos));
                  this.storage.get('lista').then((val) => {
                    if (val !== null) {
                      this.articulos = this.convertir(JSON.parse(val));
                    } else {
                      this.alerta('You have no news added');
                    }
                  });
                }
              }
            ]
          })
          await alert.present();
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
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
