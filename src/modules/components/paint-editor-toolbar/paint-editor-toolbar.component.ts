import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {DefaultSelectedTools} from '../../models/default-selected-tools.model';

import {toolbarButtons} from './toolbarButtons';

@Component({
    selector: 'app-paint-editor-toolbar',
    templateUrl: './paint-editor-toolbar.component.html',
    styleUrls: ['./paint-editor-toolbar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintEditorToolbarComponent {
    @Input() defaultSettings: DefaultSelectedTools;
    @Output() toolSelect = new EventEmitter<any>();
    @Output() colorSelect = new EventEmitter<any>();
    @Output() sizeChange = new EventEmitter<any>();
    public toolbarButtons = toolbarButtons;
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
