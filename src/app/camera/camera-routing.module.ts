import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './camera.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraRoutingModule {}

export const cameraRoute: Routes = [
  {
    path: '',
    component: CameraComponent,
    data: {
      pageTitle: 'Camera',
    },
  },
];
