import { Directive } from '@angular/core';
import { EmitChangesDirective } from '@oshanrube/origami';

@Directive({
  selector: `paper-ripple`
})
export class PaperElement extends EmitChangesDirective { }
