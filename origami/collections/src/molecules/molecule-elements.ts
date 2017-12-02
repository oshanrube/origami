import { Directive } from '@angular/core';
import { EmitChangesDirective } from '@oshanrube/origami';

@Directive({
  selector: `marked-element, prism-element`
})
export class MoleculeElement extends EmitChangesDirective { }
