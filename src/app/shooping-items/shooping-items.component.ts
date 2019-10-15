import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartesService} from '../cartes.service';
import {MatSnackBar} from '@angular/material';
import {v4 as uuid} from 'uuid';
import {CaddyService} from '../caddy.service';

@Component({
  selector: 'app-shooping-items',
  templateUrl: './shooping-items.component.html',
  styleUrls: ['./shooping-items.component.css']
})
export class ShoopingItemsComponent implements OnInit {
  info = {mail: '', name: '', message: '', description: '', price: 0, fileName: ''};
  public caddy: any = {carte: ''};
  public carte: any = {};
  public total = 0;
  loaded = false;
  private commandeData: any = {date: '', total: 0};
  private commandeID: any;
  private ligne: any = {carte: '', quantity: 0, price: 0, commande: '', code: '', secretcode: ''};
  private detailCarte: any = {currentprice: 0, withdraw: 0, orderitem: ''};
  private lignecommandeID: any;

  constructor(private caddyService: CaddyService, private router: Router,
              private cartesService: CartesService, private snackBar: MatSnackBar, public carteService: CartesService) {
  }

  ngOnInit() {
    this.getCaddy();
    console.log(this.caddy);
    this.total = 0;
  }

  public gen() {
    console.log(uuid());
    return uuid();
  }

  getCaddy() {
    this.total = 0;
    this.caddyService.getCaddy().subscribe((data: {}) => {
      console.log('data:' + data);
      this.caddy = data;
      console.log('caddy! : ' + this.caddy);
      console.log('nombre elements:' + this.caddy['hydra:totalItems']);
      this.loaded = true;
      /* console.log(this.caddy['hydra:totalItems']); Calcule du prix total des cartes .*/
      if (this.caddy['hydra:totalItems'] > 0) {
        let i = 0;
        do {/* console.log('valeur de i ' + i);*/
          this.total = this.total + this.caddy['hydra:member'][i].carte.currentPrice;
          i++;
        } while (i < this.caddy['hydra:totalItems']);
        console.log('total est : ' + this.total);
      }
    }, (err) => {
      console.log(err);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 1500,});
  }

  deleteCart(id: any) {
    console.log(id);
    this.caddyService.removeCarte(id).subscribe((data: {}) => {
      this.getCaddy(); /* console.log(data);*/
      this.openSnackBar('Carte numéro ' + id + ' supprimer avec succès', 'Done'); /* this.caddy = data;*/
    }, (err) => {
      console.log(err);
    });
  }

  sendmail(mail) {
    // this.senfpdf(this.fileName, this.imagebase);
    console.log('pdf uploaded');
    // this.info.description = this.caddy.description;
    // this.info.fileName = this.caddy.fileName;
    this.info.description = 'this.caddy.description';
    this.info.fileName = 'safwen1005';
    this.info.mail = mail;
    console.log(this.info);
    this.carteService.sendmail(this.info)
      .subscribe(data => {
        console.log('mail envoyer avec succces');
      }, err => {
        console.log(err);
      });
  }

  payement() {
    console.log('payement');
    this.commandeData.date = 'datetest';
    this.commandeData.total = this.total;
    console.log(this.commandeData);
    this.caddyService.addCommande(this.commandeData).subscribe((result) => {
      this.commandeID = result.id;
      console.log('succes + commandeID = ', +this.commandeID);
      this.addLigne();
    }, (err) => {
      console.log(err);
    });
  }

  addLigne() {
    let i = 0;
    do {
      this.addLigneCommande(this.caddy['hydra:member'][i]);
      // this.addDetailCarte(this.caddy['hydra:member'][i]);
      console.log(this.caddy['hydra:member'][i].id);
      const mail = this.caddy['hydra:member'][i].mail;
      this.sendmail(mail);
      this.deleteCart(this.caddy['hydra:member'][i].id);
      i++;
    } while (i < this.caddy['hydra:totalItems']);
  }

  /* this.addLigneCommande(this.caddy['hydra:member'][0]);*/
  addLigneCommande(data: any) {
    console.log('nombre total : ' + this.caddy['hydra:totalItems']);
    /* caddy['hydra:member'][i].carte.id)*/
    this.ligne.carte = 'api/cartes/' + data.carte.id;
    this.ligne.quantity = 5;
    this.ligne.price = data.carte.currentPrice;
    this.ligne.commande = '/api/commandes/' + this.commandeID;
    this.ligne.secretcode = Math.floor((Math.random() * 100) + 1000);
    this.ligne.code = this.gen();
    // this.ligne.code = 255 ;
    console.log(JSON.stringify(this.ligne));
    this.caddyService.addLigneCommande(this.ligne).subscribe((result) => {
      this.lignecommandeID = result.id;
      console.log('success command line= ' + this.commandeID);
      this.addDetailCarte(data);
    }, (err) => {
      console.log(err);
    });
  }

  private addDetailCarte(data: any) {
    console.log('nombre total : ' + this.caddy['hydra:totalItems']);
    // this.detailCarte.carte = 'api/cartes/' + data.carte.id;
    this.detailCarte.currentprice = data.carte.currentPrice;
    // this.detailCarte.priceleft = data.carte.currentPrice;
    this.detailCarte.withdraw = 0;
    this.detailCarte.orderitem = '/api/order_items/' + this.lignecommandeID;
    // this.detailCarte.codeabarre = 123456;
    console.log(JSON.stringify(this.detailCarte));
    this.caddyService.addDetailCarte(this.detailCarte).subscribe((result) => {
      console.log('succes ligne detail = ');
    }, (err) => {
      console.log(err);
    });
  }
}
