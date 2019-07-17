import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';

import {MisPaintEditorToolbarComponent} from './components/paint-editor-toolbar/paint-editor-toolbar.component';
import {MisPaintEditorComponent} from './components/paint-editor/paint-editor.component';
import {MisSliderComponent} from './components/slider/slider.component';

@NgModule({
    imports: [
        CommonModule,
        Ng5SliderModule
    ],
    declarations: [
        MisPaintEditorComponent,
        MisPaintEditorToolbarComponent,
        MisSliderComponent
    ],
    exports: [
        MisPaintEditorComponent
    ],
    entryComponents: []
})

export class PaintEditorModule {
}
