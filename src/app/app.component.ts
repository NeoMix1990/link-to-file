import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  imgFileData64;
  ngOnInit() {
    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }));


  toDataURL('http://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?size=800')
    .then(dataUrl => {
      console.log('RESULT:', dataUrl);
      this.imgFileData64 = dataUrl;
    })
    }
}
