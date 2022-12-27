import { Directive, EventEmitter, HostListener, Input, Output, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import { CpfValidator } from './validators';

@Directive({
  selector: '[appCpfValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CpfValidatorDirective),
    multi: true
  }]
})
export class CpfValidatorDirective extends CpfValidator implements Validator {
  @Input() ngModel!: string;
	@Output() ngModelChange = new EventEmitter();
  ngOnChanges(changes: SimpleChanges) {
		// if (changes.ngModel && changes.ngModel.currentValue && this.ngModel != this.lastValue) {
		// 	const event = {target: {value: changes.ngModel.currentValue}};
			// this.onInput(event);
		// }

    console.log('changes: ', changes);
    
	}

  @HostListener( 'input', ['$event'] )
	onInput( $event: any ) {
		let value = $event.target.value;
		if (value) {
			value = value.replace(/\D/g, '').substring(0,14);

			if (value.length > 2) {
				if (value.length <= 6) {
					value = value.substring(0,5).replace(/^(\d{3})?(\d{3})?/, '$1.$2');
				} else if (value.length <= 9) {
					value = value.substring(0,9).replace(/^(\d{3})?(\d{3})?(\d{3})?/, '$1.$2.$3');
				} else {
					value = value.substring(0,11).replace(/^(\d{3})?(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4');
				}
			}
		}
	}
}
