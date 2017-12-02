import { Directive } from '@angular/core';
import { EmitChangesDirective } from '@oshanrube/origami';

@Directive({
  selector: `paper-badge, paper-button, paper-card, paper-dropdown-menu, paper-dropdown-input, paper-icon-button,
    paper-icon-item, paper-item, paper-item-body, paper-menu, paper-menu-button, paper-progress,
    paper-spinner, paper-swatch-picker, paper-tab, paper-tabs, paper-toast, paper-toolbar,
    paper-tooltip`
})
export class PaperUiElement extends EmitChangesDirective { }
