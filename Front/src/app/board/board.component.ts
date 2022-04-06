import './../shape-factory.service';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import Konva from 'konva';
import {
  ShapeCreator
} from './../shape-factory.service';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  Drawing = false; /// if mouse button is down
  @Input('tool') tool = "brush";
  shapeFactory;
  stroke = 'black';
  strokeWidth = 10;
  fill = 'black';
  shapeObject: any;
  @Input('shapeType') shapeType = "";
  resizing = false;
  moving = false;
  deleting = false;
  dublicating = false;
  mode: string = 'source-over';
  x1: any = 0;
  y1: any = 0;
  x2: any = 0;
  y2: any = 0;
  stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
  });
  tempLayer = new Konva.Layer();
  mainLayer = new Konva.Layer();
  tempLine: any;
  tr: any;
  api: any;

  constructor(factory: ShapeCreator, api: APIServiceService) {
    this.shapeFactory = factory;
    this.api = api;
  }
  ngOnInit(): void {
    this.stage.add(this.tempLayer);
    this.stage.add(this.mainLayer);
    this.mainLayer.zIndex(50);
    this.tempLayer.zIndex(100);
    this.tr = new Konva.Transformer();
    this.stage.on("mousedown", (e) => {
      this.down();
    });
    this.stage.on("mouseup", (e) => {
      this.up();
    });
    this.stage.on("mousemove", (e) => {
      this.move();
    });
  }
  selectedFiles: any;
  currentFile: any;
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.currentFile = this.selectedFiles.item(0);
    const formData: FormData = new FormData();
    formData.append('file', this.currentFile);
    this.api.post('upload', formData, this.stage);
  }
  download() {
    let type = prompt("Jason or XML (J/X)");
    if (type == "J" || type == "j") {
      this.api.get("downloadJSON");
    } else if (type == "X" || type == "x") {
      this.api.get("downloadXML");
    }
  }
  undo() {
    this.stage.destroyChildren();
    this.api.get("undo", this.stage);
    this.stage.add(this.tempLayer);
    this.stage.add(this.mainLayer);
  }
  redo() {
    this.stage.destroyChildren();
    this.api.get("redo", this.stage);
    this.stage.add(this.tempLayer);
    this.stage.add(this.mainLayer);
  }
  down() {
    var pos = this.stage.getPointerPosition();
    this.x1 = pos!.x,
      this.x2 = pos!.x,
      this.y1 = pos!.y;
    this.y2 = pos!.y;
    this.shapeObject = this.shapeFactory.factoryMethod(this.shapeType, this.x1, this.y1, this.x1, this.y1, this.mode, this.stroke, this.strokeWidth, false).get();
    this.Drawing = true;
  }
  up() {
    if (this.Drawing == false) return;
    this.Drawing = false;
    if (this.tool == 'move' || this.tool == 'del' || this.tool == 'resize' || (this.x2 == this.x1 && this.y2 == this.y1)) return;
    this.mainLayer.add(this.shapeObject);
    this.api.post("add", this.mainLayer.toJSON(), this.stage);
  }

  move() {
    if (this.moving && this.tool == 'move') {
      this.Drawing = false;
    } else if (this.tool == 'move') {
      this.Drawing = false;
      this.movable();
    } else if (this.moving) {
      this.Drawing = false;
      this.nonMovable();
    }
    if (this.tool == 'resize' && this.resizing) {
      this.Drawing = false;
    } else if (this.tool == 'resize') {
      this.Drawing = false;
      this.resizable();
    } else if (this.resizing) {
      this.Drawing = false;
      this.nonResizable();
    }

    if (this.deleting && this.tool == 'del') {
      this.Drawing = false;
      return;
    } else if (this.tool == 'del') {
      this.Drawing = false;
      this.deletable();
    } else if (this.deleting) {
      this.Drawing = false;
      this.nonDeletable();
    }
    if (this.tool == 'dublicate') {
      this.Drawing = false;
      this.dublicatable();
    } else if (this.dublicating) {
      this.Drawing = false;
      this.nonDublicatable();
    }

    if (!this.Drawing) return;
    let pos = this.stage.getPointerPosition();
    this.x2 = pos?.x,
      this.y2 = pos?.y;
    if (this.tool == "shapes") {
      this.tempLayer.destroyChildren();
      this.shapeObject = this.shapeFactory.factoryMethod(this.shapeType, this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1, this.fill, this.stroke, this.strokeWidth, false).get();
      this.tempLayer.add(this.shapeObject);
    } else {
      this.tempLine = this.shapeObject.points().concat([this.x2, this.y2]);
      this.shapeObject.points(this.tempLine);
      this.tempLayer.add(this.shapeObject);
    }
  }
  dublicatable(this: BoardComponent) {
    this.mainLayer.on('click', function (evt) {
      let x = evt.target.getPosition().x;
      let y = evt.target.getPosition().y;
      this.add(evt.target.clone({ x: x + 30, y: y + 30 }));
    });
    for (let i = 0; i < this.mainLayer.getChildren().length; i++) {
      this.mainLayer.getChildren()[i].on('mouseover', () => {
        document.body.style.cursor = "cell";
      });

      this.mainLayer.getChildren()[i].on('mouseout', () => {
        document.body.style.cursor = "default";
      });
    }
    this.dublicating = true;
  }

  nonDublicatable() {
    this.mainLayer.removeEventListener('click');
    for (let i = 0; i < this.mainLayer.getChildren().length; i++) {
      this.mainLayer.getChildren()[i].on('mouseover', () => {
        document.body.style.cursor = "default";
      });
      this.mainLayer.getChildren()[i].on('mouseout', () => {
        document.body.style.cursor = "default";
      });

    }
    document.body.style.cursor = "default";
    this.dublicating = false;
  }
  deletable() {
    this.mainLayer.on('click', function (evt) {
      evt.target.destroy();
    });
    for (let i = 0; i < this.mainLayer.getChildren().length; i++) {
      this.mainLayer.getChildren()[i].on('mouseover', () => {
        document.body.style.cursor = "crosshair";
      });

      this.mainLayer.getChildren()[i].on('mouseout', () => {
        document.body.style.cursor = "default";
      });
    }
    this.deleting = true;
  }
  nonDeletable() {
    this.mainLayer.removeEventListener('click');
    for (let i = 0; i < this.mainLayer.getChildren().length; i++) {
      this.mainLayer.getChildren()[i].on('mouseover', () => {
        document.body.style.cursor = "default";
      });
      this.mainLayer.getChildren()[i].on('mouseout', () => {
        document.body.style.cursor = "default";
      });

    }
    document.body.style.cursor = "default";
    this.deleting = false;
  }
  movable() {
    for (let i = 0; i < this.mainLayer.getChildren().length; i++) {
      this.mainLayer.getChildren()[i].setAttrs({
        draggable: true
      });

      this.mainLayer.getChildren()[i].on('mouseover', () => {
        document.body.style.cursor = "move";
      });

      this.mainLayer.getChildren()[i].on('mouseout', () => {
        document.body.style.cursor = "default";
      });
    }
    this.moving = true;
  }
  nonMovable() {
    for (let i = 0; i < this.mainLayer.getChildren().length; i++) {
      this.mainLayer.getChildren()[i].setAttrs({
        draggable: false
      });
      this.mainLayer.getChildren()[i].on('mouseover', () => {
        document.body.style.cursor = "default";
      });
    }
    this.moving = false;
  }
  nonResizable() {
    this.tempLayer.destroyChildren();
    this.resizing = false;
  }
  resizable() {
    this.tr = new Konva.Layer();
    for (let i = 0; i < this.mainLayer.getChildren().length; i++) {
      var tr = new Konva.Transformer({
        nodes: [this.mainLayer.getChildren()[i]],
        anchorDragBoundFunc: function (oldPos: any, newPos: any, event: any) {
          if (tr.getActiveAnchor() === 'rotater') {
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );
          if (dist > 10) {
            return newPos;
          }
          return newPos;
        },
      });
      this.tempLayer.add(tr);
    }
    this.stage.add(this.tempLayer);
    this.resizing = true;
  }

}
