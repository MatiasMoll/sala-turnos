import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireUploadTask } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ImagenService {


  basePath = '/images';                       
  downloadableURL = '';  
  downloadableURL2 = '';                       
  task!: AngularFireUploadTask;
  progressValue!: Observable<any>;

  constructor(private http: HttpClient) {}


  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(`/api/v1/image-upload`, formData);
  }
}