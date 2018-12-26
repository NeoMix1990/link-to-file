import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {

  }

  imgFileData64;
  ngOnInit() {
  //   const toDataURL = url => fetch(url)
  //   .then(response => response.blob())
  //   .then(blob => new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //     console.log(reader);
  //   }));




  // toDataURL('http://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?size=800').then(dataUrl => {console.log('RESULT:', dataUrl);this.imgFileData64 = dataUrl;});
    this.returnData('http://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?size=800').subscribe(data => {
      console.log(data);
      this.imgFileData64 = data;
      
    });
  }

  returnData(url) {
    return this.http.get(url, {responseType: 'blob'}).pipe(
      switchMap(
        data => {
          console.log(data);
          const reader = new FileReader();
          reader.readAsDataURL(Object(data));
          return Observable.create(observer => {
            reader.onload = () => {
              observer.next(reader.result);
              observer.complete();
            };
          });
        }
      )
      );
  }
}
