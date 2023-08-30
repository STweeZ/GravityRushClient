import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  image = './assets/gravityRush/GravityRushInGame.png';
  imageIcon = './assets/gravityRush/GravityRushLogo.png';

  constructor() { }

  ngOnInit() {
  }

}
