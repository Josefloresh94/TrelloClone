import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { faXmark, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToDo } from '@models/todo';
import { BtnComponent } from '@modules/shared/components/btn/btn.component';

interface InputData{
  todo: ToDo;
}

interface OutputData{
  rta: boolean;
}

@Component({
  selector: 'app-todo-dialog',
  imports: [BtnComponent, FontAwesomeModule, DialogModule],
  templateUrl: './todo-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDialogComponent {
  faClose = faXmark;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  todo!: ToDo;
  dialogRef = inject<DialogRef<OutputData>>(DialogRef);
  data: InputData = inject(DIALOG_DATA);

  constructor() {
    this.todo = this.data.todo;
  }

  close(){
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }
}
