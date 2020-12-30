import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule, cameraRoute } from './camera-routing.module';
import { CameraComponent } from './camera.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CameraComponent],
  imports: [
    CommonModule,
    CameraRoutingModule,
    RouterModule.forChild(cameraRoute)
  ]
})
export class CameraModule { }
