import {Component, OnInit} from '@angular/core';
import {JwtService} from '../jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;

  constructor(private router: Router,
              private authenticationService: JwtService) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.username, this.password)
      .subscribe(result => {
        console.log(result);
        if (this.authenticationService.getRole() === 'ROLE_PROVIDER') {
          this.router.navigate(['/fournisseur']);
        } else {
          this.router.navigate(['/']);
        }
      }, loginError => this.error = loginError.message + ' : verify  your username or password !  ');
  }
}
