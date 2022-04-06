import { Injectable } from '@angular/core';
import Konva from 'konva';


@Injectable({
  providedIn: 'root'
})
export abstract class ShapeFactoryService {
  constructor() { }
  public abstract factoryMethod(shape: string, x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number, draggable: boolean): Shape;
  public someOperation(shape: string, x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number, draggable: boolean) {
    const product = this.factoryMethod(shape, x, y, width, height, fill, stroke, strokeWidth, draggable);
    product.get();
  }

}

@Injectable({ providedIn: 'root' })
export class ShapeCreator extends ShapeFactoryService {
  public factoryMethod(shape: string, x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number, draggable: boolean): Shape {
    switch (shape) {
      case 'cir':
        return new myCircle(x, y, width, height, fill, stroke, strokeWidth, draggable);
      case 'rect':
        return new myRectangle(x, y, width, height, fill, stroke, strokeWidth, draggable);
      case 'squ':
        return new mySquare(x, y, width, height, fill, stroke, strokeWidth, draggable);
      case 'line':
        return new myLine(x, y, width, height, fill, stroke, strokeWidth, draggable);
      case 'strline':
        return new myStrLine(x, y, width, height, fill, stroke, strokeWidth, draggable);
      case 'tri':
        return new myTriangle(x, y, width, height, fill, stroke, strokeWidth, draggable);
      default:
        return new mySquare(x, y, width, height, fill, stroke, strokeWidth, draggable);
    }

  }
}
export interface Shape {
  x: number
  y: number,
  width: number,
  height: number,
  fill: string,
  stroke: string,
  strokeWidth: number,
  draggable: boolean;
  get(): any;
}
class myCircle implements Shape {
  x; y; width; height; fill; stroke; strokeWidth; draggable;
  structure;

  constructor(x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number, draggable: boolean) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.draggable = draggable;
    this.structure = new Konva.Circle({
      x: x,
      y: y,
      radius: Math.abs(width),
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      draggable: draggable
    });
  }
  public get(): any {
    return this.structure;

  }
}

class myRectangle implements Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  draggable: boolean;
  structure;
  constructor(x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number, draggable: boolean) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.draggable = draggable;
    this.structure = new Konva.Rect({
      x: x,
      y: y,
      width: width,
      height: height,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      draggable: draggable
    });
  }

  public get(): any {
    return this.structure;
  }
  public clone(): this {
    const clone = Object.create(this);
    clone.width = this.width + 10;
    clone.structure = Object.create(this.structure);

    return clone;
  }
}
class mySquare extends myRectangle {
  constructor(x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number, draggable: boolean) {
    super(x, y, width, width, fill, stroke, strokeWidth, draggable);
  }

  public get(): any {
    return super.get();
  }

}
class myTriangle implements Shape {
  x; y; width; height; fill; stroke; strokeWidth; draggable;
  structure: any;

  constructor(x: number, y: number, width: number, height: number, fill: any, stroke: string, strokeWidth: number, draggable: boolean) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.draggable = draggable;
    this.structure = new Konva.RegularPolygon({
      x: this.x,
      y: this.y,
      sides: 3,
      radius: Math.abs(width),
      fill: this.fill,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
    });
  }
  get(): any {
    return this.structure;
  }

}

class myLine implements Shape {
  x; y; width; height; fill; stroke; strokeWidth; draggable;
  structure: any;

  constructor(x: number, y: number, width: number, height: number, fill: any, stroke: string, strokeWidth: number, draggable: boolean) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.draggable = draggable;
    this.structure = new Konva.Line({
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      globalCompositeOperation: this.fill,
      lineCap: 'round',
      points: [this.x, this.y, this.width, this.height],
      draggable: this.draggable,
    });
  }
  get(): any {
    return this.structure;
  }
}
class myStrLine extends myLine {
  constructor(x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number, draggable: boolean) {
    super(x, y, width + x, height + y, fill, stroke, strokeWidth, draggable);
  }
  get() {
    return this.structure;
  }
}