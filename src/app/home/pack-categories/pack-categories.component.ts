import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../services.service';

@Component({
  selector: 'app-pack-categories',
  templateUrl: './pack-categories.component.html',
  styleUrls: ['./pack-categories.component.css']
})
export class PackCategoriesComponent implements OnInit {
  categories;

  constructor(private service: ServicesService) {
  }

  ngOnInit() {
    this.onGetCategories();
  }

  onGetCategories() {
    this.service.fetchCategories()
      .subscribe(data => {
        console.log(data);
        this.categories = data;
      }, error => {
        console.log(error);
      });
  }
}
