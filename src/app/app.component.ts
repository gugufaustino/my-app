import { Component, OnInit, AfterViewInit } from '@angular/core';

declare function mainBuild(): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'my-app';

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    mainBuild()
  }

}


