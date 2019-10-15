import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../services.service';

@Component({
  selector: 'app-pack-new-cards',
  templateUrl: './pack-new-cards.component.html',
  styleUrls: ['./pack-new-cards.component.css']
})
export class PackNewCardsComponent implements OnInit {

  cards;

  constructor(private service: ServicesService) {
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
