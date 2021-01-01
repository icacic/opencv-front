import { Rect } from './entities/rect-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

type EntityArrayResponseType = HttpResponse<Rect[]>;
@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor(protected http: HttpClient) { }  

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public sendPicture(file: any) {
    const formData = new FormData();
    //formData.append('file', btoa(file));
    formData.append('file', file);
    formData.append('fileName', 'Fuck you rest.jpg');
    return this.http.post<EntityArrayResponseType>('http://localhost:8080/opencv/upload', formData);
  }

}
