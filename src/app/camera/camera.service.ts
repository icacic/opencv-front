import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(protected http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    })
  };

  public sendPicture(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    //formData.append('fileName', 'Fuck you rest');
    return this.http.post<string>('http://localhost:8080/opencv/upload', formData);
  }

}
