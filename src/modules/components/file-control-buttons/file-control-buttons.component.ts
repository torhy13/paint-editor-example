import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-control-buttons',
  templateUrl: './file-control-buttons.component.html',
  styleUrls: ['./file-control-buttons.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileControlButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
