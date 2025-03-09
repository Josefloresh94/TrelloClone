import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-btn',
  imports: [NgClass, FontAwesomeModule],
  templateUrl: './btn.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'success' | 'primary' | 'danger' | 'light' | 'sky' = 'primary';
  faSpinner = faSpinner;

  get colorClasses(): string {
    const classes = {
      'success': 'bg-success-700 hover:bg-success-800 focus:ring-success-300 text-white',
      'primary': 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 text-white',
      'danger': 'bg-danger-700 hover:bg-danger-800 focus:ring-danger-300 text-white',
      'sky': 'bg-sky-700 hover:bg-sky-800 focus:ring-sky-300 text-white',
      'light': 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-50 text-gray-700'
    };

    return classes[this.color] || classes.primary;
  }
}
