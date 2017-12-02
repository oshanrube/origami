import { Directive } from '@angular/core';
import { EmitChangesDirective } from '@oshanrube/origami';

@Directive({
  selector: `platinum-bluetooth, platinum-https-redirect, platinum-push-messaging, platinum-sw`
})
export class PlatinumElement extends EmitChangesDirective { }
