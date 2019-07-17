import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {expect} from 'chai';

import {MisSliderComponent} from './slider.component';

describe('SliderComponent', () => {
    let component: MisSliderComponent;
    let fixture: ComponentFixture<MisSliderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MisSliderComponent]
        })
            .overrideComponent(MisSliderComponent, {
                set: {template: `<p></p>`}
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MisSliderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).to.be.not.equal(null);
    });
});
