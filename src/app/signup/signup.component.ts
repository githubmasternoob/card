import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from '../jwt.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: any;
  shoppingcartData = {TotalCost: 0, Validity: 0, user: '/api/users/'};
  private username: string;
  private password: string;
  private error: string;

  constructor(private router: Router,
              private authenticationService: JwtService) {
  }

  ngOnInit() {
  }


  onSignup() {
    console.log(this.username + this.password + this.email);
    this.authenticationService.register(this.username, this.password, this.email)
      .subscribe(result => {
        console.log('result' + result);
        console.log('Creation de la panier ...');
        this.shoppingcartData.user = this.shoppingcartData.user + result;
        this.CreateShoppingCart(this.shoppingcartData);
        this.router.navigate(['/']);
      }, loginError => console.log(loginError));

  }

  private CreateShoppingCart(data) {
    this.authenticationService.CreateShoppingCart(data)
      .subscribe(result => {
        console.log('result de la creation panier' + result);
        console.log('panier creeer ! ');
        this.router.navigate(['/']);
      }, loginError => console.log(loginError));

  }
}
