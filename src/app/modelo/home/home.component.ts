import { AfterViewInit, Component, OnInit } from '@angular/core';

declare function appUserList(data:any): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let ob = [{
      'id' : "1",
      'nome_completo' : "Well",
      'idade':99,
      'situacao': 1 ,
      'action':"",
      'email' : "well.faustino",
      "avatar": "12.png"
      }

  ]
    appUserList(ob);
  }

}
