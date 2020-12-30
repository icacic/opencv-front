import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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

  public ngOnInit() {}

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject=stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);


    console.log(this.canvas.nativeElement.toDataURL('image/png'));
    this.cameraService.sendPicture(this.canvas.nativeElement.toDataURL('image/png'))
      .subscribe(
        ((result: any) => {
          //console.log(result);
        }));
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
  }



}
