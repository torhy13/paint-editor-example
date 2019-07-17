import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {expect} from 'chai';
import {Ng5SliderModule} from 'ng5-slider';

import {MisIconModule} from '../../../../ui-kit/components';
import {MisPaintEditorToolbarComponent} from '../paint-editor-toolbar/paint-editor-toolbar.component';
import {MisSliderComponent} from '../slider/slider.component';

import {MisPaintEditorComponent} from './paint-editor.component';

describe.skip('PaintEditorComponent', () => {
    let component: MisPaintEditorComponent;
    let fixture: ComponentFixture<MisPaintEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MisIconModule, Ng5SliderModule, BrowserAnimationsModule],
            declarations: [MisPaintEditorComponent, MisPaintEditorToolbarComponent, MisSliderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MisPaintEditorComponent);
        component = fixture.componentInstance;
        component.id = '1';
        component.textarea = {nativeElement: {
                addEventListener: () => {},
                removeEventListener: () => {}
            }} as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).to.be.not.equal(null);
    });
});
