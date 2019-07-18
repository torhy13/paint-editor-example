import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Options} from 'ng5-slider';
import {ChangeContext} from 'ng5-slider/change-context';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() initialValue: number;
  @Input() options: Options;
  @Output() valueChangeEnd = new EventEmitter<number>();

  onValueChangeEnd(event: ChangeContext) {
    this.valueChangeEnd.emit(event.value);
  }

}
