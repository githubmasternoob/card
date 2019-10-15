import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../category.service';
import {CartesService} from '../cartes.service';
import {CaddyService} from '../caddy.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  categories;
  cartes;
  carteData: any = {shoppingcart: '', carte: ''};
  quantity: number;
  loaded = false;

  constructor(private cartesService: CartesService, private route: Router, private categoriesService: CategoryService,
              private caddyService: CaddyService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getCartes();
  }

  getCategories() {
    this.categoriesService.getResource('/categories')
      .subscribe(data => {
        this.categories = data;
        console.log(data);
      }, err => {
        console.log(err);
      });

  }

  getCartes() {
    this.cartesService.getResource('/cartes')
      .subscribe(data => {
        this.cartes = data;
        console.log(data);
        this.loaded = true;
      }, err => {
        console.log(err);
      });
  }

  onAddProductToCaddy(id: any) {
    const userId = +localStorage.getItem('userId');
    this.carteData.shoppingcart = '/api/shopping_carts/' + userId;
    this.carteData.carte = '/api/cartes/' + id;
    console.log('call of the function in the component');
    console.log(this.carteData);
    this.caddyService.addProduct(this.carteData).subscribe((result) => {
      console.log('success');
    }, (err) => {
      console.log(err);
    });
  }
}
