import { Component, OnInit } from '@angular/core';

declare function mainBuild(): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'my-app';

  ngOnInit(): void {
    mainBuild()
  }

}


