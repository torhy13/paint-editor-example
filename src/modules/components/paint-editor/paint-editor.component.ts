import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import * as Konva from 'konva';
import {Layer} from 'konva/types/Layer';
import {Shape} from 'konva/types/Shape';
import {Stage} from 'konva/types/Stage';

import {Colors} from '../../enums/colors.enum';
import {ToolTypes} from '../../enums/tool-types.enum';
import {WindowDocumentRef} from '../../../services/documentWindow.service';
import {ImageContentTypes} from '../../../enums/image-content-types';

interface ImgParams {
  width: number;
  height: number;
  x: number;
  y: number;
}

const defaultFileName = 'awesomePaintedPic';
const fontStyle = '20px Arial';
const initialStep = -1;

@Component({
  selector: 'app-paint-editor',
  templateUrl: './paint-editor.component.html',
  styleUrls: ['./paint-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaintEditorComponent),
      multi: true
    }
  ]
})
export class PaintEditorComponent implements AfterViewInit, OnDestroy {
  @Input() id: string;
  @ViewChild('editorWrapper', {static: false}) editorWrapper: ElementRef;
  @ViewChild('textarea', {static: false}) textarea: ElementRef;
  @ViewChild('textareaWrapper', {static: false}) textareaWrapper: ElementRef;
  public defaultToolbarSettings = {
    tool: ToolTypes.pen,
    color: Colors.red,
    lineWidth: 10
  };
  public isDisabled = false;
  public showFileManageBtns = false;
  private konva = Konva as any;
  private canvas: HTMLCanvasElement;
  private canvasSize: { width: number, height: number };
  private context: CanvasRenderingContext2D;
  private serviceContext: CanvasRenderingContext2D;
  private mode: ToolTypes = this.defaultToolbarSettings.tool;
  private canvasImage: Shape;
  private stage: Stage;
  private step = initialStep;
  private stepArray: ImageData[] = [];
  private lastPointerPosition: { x: number, y: number };
  private isFreeDrawing = false;
  private isTextEditing = false;
  private paintingLayer: Layer;
  private serviceLayer: Layer;
  private backgroundLayer: Layer;

  constructor(private windowDocumentRef: WindowDocumentRef, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.canvasSize = {
      width: this.editorWrapper.nativeElement.offsetWidth,
      height: 500
    };
    this.editorWrapper.nativeElement.style.cursor = this.isDisabled ? 'default' : 'crosshair';
    const konvaInstance = this.konva;
    this.initStage(konvaInstance);
    this.initCanvas();
    this.initLayers(konvaInstance);
    this.initEvents();
  }

  public onToolSelect(tool: ToolTypes) {
    if (tool !== ToolTypes.undo) {
      this.mode = tool;
    }
    switch (tool) {
      case ToolTypes.undo :
        this.undo();
        break;
    }
  }

  public onSaveFile() {
    const link = this.windowDocumentRef.nativeDocument.createElement('a');
    link.href = this.stage.toDataURL();
    link.download = defaultFileName;
    link.click();
  }

  public onClearFile() {
    this.backgroundLayer.destroyChildren();
    this.backgroundLayer.clear();
    this.switchFileManageBtns(false);
    this.clearBoard();
  }

  public initBackgroundImage(base64Img: string) {
    const bgImageObj = new Image();
    bgImageObj.src = base64Img;
    bgImageObj.onload = () => {
      const imageParams = this.getImageParamsOnCanvas(bgImageObj);
      const bgImg = new this.konva.Image({
        x: imageParams.x,
        y: imageParams.y,
        image: bgImageObj,
        width: imageParams.width,
        height: imageParams.height
      });
      this.backgroundLayer.add(bgImg);
      this.backgroundLayer.draw();
    };

    this.switchFileManageBtns(true);
  }

  public onColorSelect(color: string) {
    this.context.strokeStyle = color;
    this.serviceContext.strokeStyle = color;
  }

  public onSizeSelect(size: number) {
    this.context.lineWidth = size;
    this.serviceContext.lineWidth = size;
  }

  writeValue(value: string) {
    if (!value) {
      return;
    }
    this.onChange(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  private onChange: (value: string) => void = (value: string) => {
  }

  private onTouched: (value: string) => void = (value: string) => {
  }

  private initStage(konva: any) {
    this.stage = new konva.Stage({
      container: this.id,
      width: this.canvasSize.width,
      height: this.canvasSize.height
    });
    this.stage.draw();
  }

  private initCanvas() {
    this.canvas = this.windowDocumentRef.nativeDocument.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.canvasSize.width;
    this.canvas.height = this.canvasSize.height;
    this.context.strokeStyle = this.defaultToolbarSettings.color;
    this.context.lineWidth = this.defaultToolbarSettings.lineWidth;
    this.context.lineJoin = 'round';
  }

  private initLayers(konva: any) {
    this.paintingLayer = new konva.Layer();
    this.backgroundLayer = new konva.Layer();
    this.serviceLayer = new konva.Layer();
    const serviceCanvas = new konva.Image({
      image: this.windowDocumentRef.nativeDocument.createElement('canvas'),
      width: this.canvasSize.width,
      height: this.canvasSize.height
    });
    this.serviceLayer.add(serviceCanvas);
    this.serviceContext = this.serviceLayer.getContext() as any;
    this.canvasImage = new konva.Image({
      image: this.canvas
    });
    this.paintingLayer.add(this.canvasImage);
    this.stage.add(this.backgroundLayer);
    this.stage.add(this.serviceLayer);
    this.stage.add(this.paintingLayer);
  }

  private initEvents() {
    if (this.isDisabled) {
      return;
    }
    this.canvasImage.on('mousedown', this.mouseDownHandler.bind(this));
    this.stage.on('mouseup', this.mouseUpHandler.bind(this));
    this.stage.on('mousemove', this.mouseMoveHandler.bind(this));
    this.textarea.nativeElement.addEventListener('blur', this.blurHandler.bind(this));
  }

  private getImageParamsOnCanvas(imageObj: HTMLImageElement): ImgParams {
    const imageAspectRatio = imageObj.width / imageObj.height;
    const canvasAspectRatio = this.canvasSize.width / this.canvasSize.height;
    let height;
    let width;
    let x;
    let y;
    if (imageAspectRatio < canvasAspectRatio) {
      height = this.canvasSize.height;
      width = imageObj.width * (height / imageObj.height);
      x = (this.canvasSize.width - width) / 2;
      y = 0;
    } else if (imageAspectRatio > canvasAspectRatio) {
      width = this.canvasSize.width;
      height = imageObj.height * (width / imageObj.width);
      x = 0;
      y = (this.canvasSize.height - height) / 2;
    } else {
      height = this.canvasSize.height;
      width = this.canvasSize.width;
      x = 0;
      y = 0;
    }

    return {width, height, x, y};
  }

  private mouseDownHandler() {
    if (this.isTextEditing) {
      return;
    }
    this.lastPointerPosition = this.stage.getPointerPosition();
    if (this.mode === ToolTypes.text) {
      this.showTextInput();
    } else {
      this.isFreeDrawing = true;
    }
    if (this.mode === ToolTypes.circle || this.mode === ToolTypes.rectangle) {
      this.serviceContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
      this.serviceLayer.moveToTop();
    }
  }

  private mouseUpHandler() {
    this.isFreeDrawing = false;
    if (this.mode === ToolTypes.circle || this.mode === ToolTypes.rectangle) {
      this.context.globalCompositeOperation = 'source-over';
      this.serviceLayer.moveToBottom();
      this.drawShape(this.stage.getPointerPosition().x, this.stage.getPointerPosition().y, this.context);
      this.paintingLayer.draw();
    }
    if (this.mode !== ToolTypes.text) {
      this.pushStep();
    }
  }

  private mouseMoveHandler() {
    if (!this.isFreeDrawing) {
      return;
    }
    switch (this.mode) {
      case ToolTypes.circle :
      case ToolTypes.rectangle :
        this.serviceContext.lineWidth = this.context.lineWidth;
        this.drawShape(this.stage.getPointerPosition().x, this.stage.getPointerPosition().y, this.serviceContext);
        break;
      case ToolTypes.pen :
        this.context.globalCompositeOperation = 'source-over';
        this.freeDrawLine();
        break;
      case ToolTypes.eraser :
        this.context.globalCompositeOperation = 'destination-out';
        this.freeDrawLine();
        break;
    }

    this.paintingLayer.draw();
  }

  private blurHandler(e: Event) {
    const el = e.target as HTMLElement;
    if (el.innerHTML.length) {
      this.applyText();
      this.pushStep();
    } else {
      this.closeTextArea();
    }
    this.isTextEditing = false;
  }

  private freeDrawLine() {
    this.context.beginPath();
    this.context.moveTo(this.lastPointerPosition.x, this.lastPointerPosition.y);
    const pos = this.stage.getPointerPosition();
    this.context.lineTo(pos.x, pos.y);
    this.lastPointerPosition = pos;
    this.context.closePath();
    this.context.stroke();
  }

  private convertAndWriteValue() {
    const val = this.stage.toDataURL({mimeType: ImageContentTypes.png});
    this.writeValue(val);
  }

  private pushStep() {
    this.step++;
    if (this.step < this.stepArray.length) {
      this.stepArray.length = this.step;
    }
    const imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.stepArray.push(imgData);
    this.switchFileManageBtns(true);
    this.convertAndWriteValue();
  }

  private undo() {
    if (this.step > 0) {
      this.step--;
      this.context.putImageData(this.stepArray[this.step], 0, 0);
      this.paintingLayer.draw();
      this.convertAndWriteValue();
    } else if (this.step !== initialStep) {
      this.step--;
      this.clearBoard();
      this.switchFileManageBtns(false);
      this.convertAndWriteValue();
    }
  }

  private switchFileManageBtns(show: boolean) {
    this.showFileManageBtns = show;
    this.changeDetectorRef.detectChanges();
  }

  private clearBoard() {
    this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.paintingLayer.draw();
  }

  private drawShape(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.serviceContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    const startX = this.lastPointerPosition.x;
    const startY = this.lastPointerPosition.y;
    ctx.strokeStyle = this.context.strokeStyle;
    ctx.beginPath();

    switch (this.mode) {
      case ToolTypes.rectangle :
        ctx.rect(startX, startY, x - startX, y - startY);
        ctx.strokeRect(startX, startY, x - startX, y - startY);
        ctx.closePath();
        break;
      case ToolTypes.circle :
        ctx.moveTo(startX, startY + (y - startY) / 2);
        ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
        ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
        ctx.stroke();
        ctx.closePath();
        break;

    }
  }

  private showTextInput() {
    this.textarea.nativeElement.innerText = '';
    const el = this.textareaWrapper.nativeElement;
    el.style.display = 'inline';
    el.style.top = `${this.lastPointerPosition.y}px`;
    el.style.left = `${this.lastPointerPosition.x}px`;
    el.style.font = fontStyle;
    el.style.color = Colors.red;
    setTimeout(() => {
      this.textarea.nativeElement.focus();
      this.isTextEditing = true;
    }, 0);
  }

  private applyText() {
    const text = this.textarea.nativeElement.innerHTML;
    this.closeTextArea();
    this.context.font = fontStyle;
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.globalCompositeOperation = 'source-over';
    this.context.fillStyle = Colors.red;
    const lineHeight = 20;
    const maxWidth = this.stage.getClientRect({}).width - this.lastPointerPosition.x;
    this.formatText(this.context, text, this.lastPointerPosition.x, this.lastPointerPosition.y, maxWidth, lineHeight);
    this.paintingLayer.draw();
  }

  private closeTextArea() {
    this.textareaWrapper.nativeElement.style.display = 'none';
  }

  private formatText(ctx: CanvasRenderingContext2D, text: string, marginLeft: number, marginTop: number,
                     maxWidth: number, lineHeight: number) {
    const hasBreaks = text.includes('<div>');
    const regEXp = /(&nbsp;|(<([^>]+)>))/g;
    const separator = hasBreaks ? '<div>' : ' ';
    const words = text.split(separator);
    const countWords = words.length;
    let line = '';
    for (let n = 0; n < countWords; n++) {
      const wordItem = words[n].replace(regEXp, '');
      const testLine = line + wordItem + ' ';
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth) {
        ctx.fillText(line, marginLeft, marginTop);
        line = wordItem + ' ';
        marginTop += lineHeight;
      } else if (hasBreaks) {
        ctx.fillText(wordItem, marginLeft, marginTop);
        marginTop += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (!hasBreaks) {
      ctx.fillText(line, marginLeft, marginTop);
    }
  }

  ngOnDestroy() {
    this.canvasImage.off('mousedown', this.mouseDownHandler);
    this.stage.off('mouseup', this.mouseUpHandler);
    this.stage.off('mousemove', this.mouseMoveHandler);
    this.textarea.nativeElement.removeEventListener('blur', this.blurHandler);
  }
}
