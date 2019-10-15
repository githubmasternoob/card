import {Component, OnInit} from '@angular/core';
import {JwtService} from '../jwt.service';
import {Router} from '@angular/router';
import {CaddyService} from '../caddy.service';
import {CartesService} from '../cartes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private total: number;
  private caddy: {};
  private number: 5;

  constructor(private authentificationService: JwtService,
              private caddyService: CaddyService, private router: Router,
              private cartesService: CartesService) {
  }

  ngOnInit() {
    this.getCaddy();
  }

  isAuthenticated() {
    return this.authentificationService.isAuthenticated();
  }

  onLogout() {
    this.authentificationService.logout();
    this.router.navigateByUrl('/login');
  }

  getCaddy() {
    this.total = 0;
    this.caddyService.getCaddy().subscribe((data: {}) => {
      console.log('data:' + data);
      this.caddy = data;
      console.log('caddy! : ' + this.caddy);
      console.log('nombre elements:' + this.caddy['hydra:totalItems']);
      this.number = this.caddy['hydra:totalItems'];
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
}
