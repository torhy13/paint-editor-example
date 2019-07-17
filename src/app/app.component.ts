import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ImageExample} from './image-examle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public imageExample = new FormControl(ImageExample);
  public id = 'hello-paint';
}
