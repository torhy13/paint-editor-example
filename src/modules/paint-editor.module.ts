import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';

import {PaintEditorToolbarComponent} from './components/paint-editor-toolbar/paint-editor-toolbar.component';
import {PaintEditorComponent} from './components/paint-editor/paint-editor.component';
import {SliderComponent} from './components/slider/slider.component';
import { FileControlButtonsComponent } from './components/file-control-buttons/file-control-buttons.component';

@NgModule({
    imports: [
        CommonModule,
        Ng5SliderModule
    ],
    declarations: [
        PaintEditorComponent,
        PaintEditorToolbarComponent,
        SliderComponent,
        FileControlButtonsComponent
    ],
    exports: [
        PaintEditorComponent
    ],
    entryComponents: []
})

export class PaintEditorModule {
}
