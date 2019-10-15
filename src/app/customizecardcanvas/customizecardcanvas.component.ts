import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartesService} from '../cartes.service';
import {CaddyService} from '../caddy.service';
import * as jsPDF from 'jspdf';
import {UploadService} from '../upload.service';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-customizecardcanvas',
  templateUrl: './customizecardcanvas.component.html',
  styleUrls: ['./customizecardcanvas.component.css']
})
export class CustomizecardCanvasComponent implements OnInit, AfterViewInit {
  cartes;
  carteData: any = {shoppingcart: '', carte: '', price: 0};
  quantity: number;
  price: 5;
  info = {mail: '', name: '', message: '', description: '', price: 0, fileName: ''};
  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  x: number;
  y: number;
  name: any;
  private id: any;
  private checked = false;
  private context: CanvasRenderingContext2D;
  private imagebase: string;
  private fileName;
  color: '';

  constructor(private route: Router,
              private actRoute: ActivatedRoute,
              public carteService: CartesService, private caddyService: CaddyService,
              private uploadService: UploadService) {
  }

  ngAfterViewInit() {
    this.context = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();
  }

  ngOnInit() {
    this.getCardById();
    this.usermail();
  }

  addText(texte, x, y) {
    console.log('add text function');
    if (this.carteData.price === this.cartes.minvalue) {
      this.reset();
    } else {
      const canvas = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');
      context.fillStyle = this.color;
      context.fillText(texte, x, y, 200);
      console.log('text added ! ');
    }
  }

  reset() {
    const canvas = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 400, 400);
    this.draw();
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

  cocher() {
    console.log('cocher ! ');
    this.checked = true;
  }

  sendmail() {
    // this.senfpdf(this.fileName, this.imagebase);
    console.log('pdf uploaded');
    this.info.description = this.cartes.description;
    this.info.fileName = this.fileName;
    console.log(this.info);
    this.carteService.sendmail(this.info)
      .subscribe(data => {
        console.log('mail envoyer avec succces');
      }, err => {
        console.log(err);
      });
  }

  public gen() {
    console.log(uuid());
    return uuid();
  }

  usermail() {
    this.caddyService.getUserMail().subscribe((result) => {
      console.log('success');
      console.log(result);
      localStorage.setItem('mail', result['hydra:member'][0].email);
    }, (err) => {
      console.log(err);
    });
  }

  onAddProductToCaddy(id: any, friend) {
    const userId = +localStorage.getItem('userId');
    this.carteData.shoppingcart = '/api/shopping_carts/' + userId;
    this.carteData.carte = '/api/cartes/' + id;
    console.log('call of the function in the component');
    this.fileName = localStorage.getItem('username');
    const x = Math.floor((Math.random() * 10) + 1000);
    console.log(x);
    this.fileName = this.fileName + x;
    this.carteData.fileName = this.fileName;
    if (friend === 0) {
      this.carteData.mail = localStorage.getItem('mail');
    } else {
      this.carteData.mail = this.info.mail;
    }
    console.log(this.carteData);
    this.imageb();
    this.caddyService.addProduct(this.carteData).subscribe((result) => {
      console.log('success');
      this.senfpdf(this.fileName, this.imagebase);
      // this.openSnackBar('Ajouter ua panier avec success', 'done');
    }, (err) => {
      console.log(err);
    });
  }

  senfpdf(fileName, imageb) {
    // const img = new Image();
    // img.src = 'assets/nike.png';
    // img.src = 'assets/' + this.cartes.photoName;
    console.log(imageb);
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.addImage(imageb, 'png', 1, 1, 120, 150);
    // doc.output('blob');
    // doc.save('a4.pdf');
    const pdf = btoa(doc.output());
    this.uploadService.sendpdf(pdf, fileName).subscribe(result => {
      console.log('result' + result);
    }, loginError => console.log(loginError));
  }

  imageb() {
    const canvas = this.myCanvas.nativeElement;
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
    this.imagebase = dataURL;
    console.log('affectation variable');
  }

  affect() {
    console.log(this.color);
    this.addText(this.carteData.price + '$', 350, 230);
    this.addText(this.gen(), 120, 230);
    this.addText(this.name, 100, 40);
  }

  private draw() {
    this.context.font = '30px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    const image = new Image();
    // const x = (this.myCanvas.nativeElement as HTMLCanvasElement).width / 2;
    // const y = (this.myCanvas.nativeElement as HTMLCanvasElement).height / 2;
    // this.context.drawImage(this.img.src, 70, 50);
    image.onload = () => {
      this.context.drawImage(image, 0, 0);
    };
    // image.src = '../../assets/img/credit-card.png';
    image.src = '/assets/' + this.cartes.photoName;
    console.log(image.src);
  }
}
