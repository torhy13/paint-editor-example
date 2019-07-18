import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {DefaultSelectedTools} from '../../models/default-selected-tools.model';

import {toolbarButtons} from './toolbarButtons';
import {ToolTypes} from '../../enums/tool-types.enum';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-paint-editor-toolbar',
  templateUrl: './paint-editor-toolbar.component.html',
  styleUrls: ['./paint-editor-toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintEditorToolbarComponent {
  @Input() defaultSettings: DefaultSelectedTools;
  @Output() toolSelect = new EventEmitter<any>();
  @Output() fileSelect = new EventEmitter<any>();
  @Output() colorSelect = new EventEmitter<any>();
  @Output() sizeChange = new EventEmitter<any>();
  public toolbarButtons = toolbarButtons;
  public toolTypes = ToolTypes;
  public sliderOpts = {
    floor: 1,
    ceil: 20,
    animate: false
  };

  onButtonGroupClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.tagName === 'BUTTON' && !clickedElement.classList.contains('toolbar-buttons__btn-undo')) {
      const isSomeButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
      if (isSomeButtonAlreadyActive) {
        isSomeButtonAlreadyActive.classList.remove('active');
      }

      clickedElement.classList.add('active');
    }

  }

  onFileSelect(event: HTMLInputEvent) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileSelect.emit(reader.result);
        event.target.value = '';
      };
    }
  }

  onToolSelect(value: string) {
    this.toolSelect.emit(value);
  }

  onColorSelect(value: string) {
    this.colorSelect.emit(value);
  }

  onSizeChange(value: number) {
    this.sizeChange.emit(value);
  }

}
