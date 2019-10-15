import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../home/services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  title = 'pagination';
  page = 2;
  items: string[] = ['Apple', 'Orange', 'Banana', 'Degla', 'Delle3', 'Test'];
  pageSize = 2;

  cards;

  constructor(private service: ServicesService,
              private route: Router) {
  }

  ngOnInit() {
    this.onGetCards();
  }

  onGetCards() {
    this.service.fetchCards()
      .subscribe(data => {
        console.log(data);
        this.cards = data;
      }, error => {
        console.log(error);
      });
  }


}
