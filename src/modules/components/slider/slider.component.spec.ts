import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SliderComponent} from './slider.component';

describe('SliderComponent', () => {
    let component: SliderComponent;
    let fixture: ComponentFixture<SliderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SliderComponent]
        })
            .overrideComponent(SliderComponent, {
                set: {template: `<p></p>`}
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
