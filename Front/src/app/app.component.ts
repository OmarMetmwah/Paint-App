import { HtmlTagDefinition } from '@angular/compiler';
import { Component,Input, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Paint';
  shapeT="line";
  toolT="brush";
  board:any;
  shapesBtn:any
  constructor(){
    window.addEventListener("mousemove",()=>{
      document.getElementById("menu")?.addEventListener("click",()=>{
        this.click();
      })
    });


  }
  click(){
  this.board=document.getElementById("board");
  this.board.children[0].children[4].click();
  }
  
}
