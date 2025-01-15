import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly message: string
  ) {}
}
