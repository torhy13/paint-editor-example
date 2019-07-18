import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-file-control-buttons',
  templateUrl: './file-control-buttons.component.html',
  styleUrls: ['./file-control-buttons.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileControlButtonsComponent  {
  @Output() saveFile = new EventEmitter<any>();
  @Output() clearFile = new EventEmitter<any>();
}
