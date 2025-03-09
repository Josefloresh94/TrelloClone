import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecoveryFormComponent } from "../../components/recovery-form/recovery-form.component";
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [RecoveryFormComponent, RouterLinkWithHref],
  templateUrl: './recovery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoveryComponent {
  constructor() {
    console.log('RecoveryComponent initialized');
  }
}
