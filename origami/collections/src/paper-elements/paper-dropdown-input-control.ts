import { Directive, OnInit, Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IronControlDirective } from '@oshanrube/origami';

export const PAPER_DROPDOWN_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaperDropdownInputControl),
  multi: true
};

@Directive({
  selector: `paper-dropdown-input`,
  providers: [PAPER_DROPDOWN_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PaperDropdownInputControl extends IronControlDirective implements OnInit {
  ngOnInit() {
    this.ironSelector = this.elementRef.nativeElement.querySelector('.dropdown-content') ||
      this.elementRef.nativeElement.children[0];
    super.ngOnInit();
  }
}
