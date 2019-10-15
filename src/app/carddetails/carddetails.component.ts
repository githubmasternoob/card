import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CartesService} from '../cartes.service';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.css']
})
export class CarddetailsComponent implements OnInit {
  info = {mail: '', name: '', message: '', description: '', price: 0};
  private id: any;
  private cartes: any;

  constructor(private route: Router,
              private actRoute: ActivatedRoute,
              public carteService: CartesService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getCardById();
  }

  getCardById() {
    const id = this.actRoute.snapshot.params.id;
    console.log(id);
    this.carteService.getCarteid(id)
      .subscribe(data => {
        this.cartes = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }


  price(prix) {
    this.info.price = prix;
  }

}
