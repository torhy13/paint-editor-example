import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {expect} from 'chai';

import {MisPaintEditorToolbarComponent} from './paint-editor-toolbar.component';

describe.skip('PaintEditorToolbarComponent', () => {
    let component: MisPaintEditorToolbarComponent;
    let fixture: ComponentFixture<MisPaintEditorToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MisPaintEditorToolbarComponent]
        })
            .overrideComponent(MisPaintEditorToolbarComponent, {
                set: {template: `<p></p>`}
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MisPaintEditorToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).to.be.not.equal(null);
    });
});
