import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaintEditorToolbarComponent} from './paint-editor-toolbar.component';

describe('PaintEditorToolbarComponent', () => {
    let component: PaintEditorToolbarComponent;
    let fixture: ComponentFixture<PaintEditorToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaintEditorToolbarComponent]
        })
            .overrideComponent(PaintEditorToolbarComponent, {
                set: {template: `<p></p>`}
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaintEditorToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
