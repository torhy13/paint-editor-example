import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng5SliderModule} from 'ng5-slider';

import {PaintEditorToolbarComponent} from '../paint-editor-toolbar/paint-editor-toolbar.component';
import {SliderComponent} from '../slider/slider.component';

import {PaintEditorComponent} from './paint-editor.component';

describe('PaintEditorComponent', () => {
    let component: PaintEditorComponent;
    let fixture: ComponentFixture<PaintEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [Ng5SliderModule, BrowserAnimationsModule],
            declarations: [PaintEditorComponent, PaintEditorToolbarComponent, SliderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaintEditorComponent);
        component = fixture.componentInstance;
        component.id = '1';
        component.textarea = {nativeElement: {
                addEventListener: () => {},
                removeEventListener: () => {}
            }} as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
