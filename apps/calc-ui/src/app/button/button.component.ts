import { Component, Input } from '@angular/core';

@Component({
  selector: 'hedgeserv-calc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  primary = false;
}
