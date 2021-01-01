import { Rect } from './entities/rect-model';
import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraService } from './camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  @ViewChild('video')
  public video: ElementRef | undefined;

  @ViewChild('canvas')
  public canvas: ElementRef | undefined;

  public captures: Array<any>;

  public constructor(private cameraService: CameraService) {
    this.captures = [];
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);


    //console.log(this.canvas.nativeElement.toDataURL('image/png'));
    this.cameraService.sendPicture(this.canvas.nativeElement.toDataURL('image/png'))
      .subscribe(
        ((result: HttpResponse<Rect[]>) => {
          
          this.drawRectangles(result);   
          //setTimeout(()=>{this.capture();}, 4000)                 
          
        }));    
      this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
  }

  private drawRectangles(rects) {
    rects.forEach(element => {
      this.canvas.nativeElement.getContext('2d').beginPath();
      this.canvas.nativeElement.getContext('2d').strokeStyle = "red";
      this.canvas.nativeElement.getContext('2d').rect(element.x*2, element.y*2, element.width*2, element.height*2);
      this.canvas.nativeElement.getContext('2d').stroke();
    });
  }



}
