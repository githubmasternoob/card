import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../test.service';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  showForm = false;
  showPriceStay = false;
  solde: number;
  price: number;
  reslt: number;
  index: number;
  items;
  itemDetails;
  itema;
  security: number;

  constructor(private testService: TestService,
              private route: Router,
              private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onRechercher(dataForm) {
    this.testService.getRecherche(dataForm)
      .subscribe(data => {
        this.items = data;
        console.log(this.items);
        console.log('card found ! ');
      });
  }


  onGetItemDetails(url) {
    const scode = this.items['hydra:member'][0].secretcode;
    console.log(this.items['hydra:member'][0].secretcode);
    if (this.security === scode) {
      console.log('correct');
      this.openSnackBar('code valide', 'correct');
      const id = this.items['hydra:member'][0].id;
      console.log('evoie au fonction : ' + id);
      this.testService.getDetailsCarte(id)
        .subscribe(data => {
          console.log('function success');
          this.itemDetails = data;
          console.log(this.itemDetails);
          this.index = this.itemDetails['hydra:totalItems'] - 1;
          this.price = this.itemDetails['hydra:member'][this.index].currentprice;
          console.log(this.price);
        }, err => {
          console.log(err);
        });
      this.showForm = true;
    } else {
      this.openSnackBar('code invalide', 'incorrect');

    }
  }

  onRetirePrice(dataForm) {
    if (this.price < dataForm.retire) {
      console.log('solde insuffisant');
      this.openSnackBar('solde insuffisant', 'retry');
    } else {
      console.log('possible');
      console.log(this.price);
      this.reslt = (this.price - dataForm.retire);
      console.log(this.reslt);
      console.log('valeur retirer: ' + dataForm.retire);
      console.log('resultat : ' + this.reslt);
      const id = this.items['hydra:member'][0].id;
      console.log('ID item : ' + id);
      const date = '2019-09-08 00:00:00';
      console.log(date);
      this.testService.retirer(dataForm.retire, this.reslt, id).subscribe(data => {
        console.log('succes' + data);
        this.openSnackBar('succes retrait', 'Bienvenue');
      }, err => {
        console.log('erreur ' + err);
      });
    }
    this.showPriceStay = true;
  }

}
