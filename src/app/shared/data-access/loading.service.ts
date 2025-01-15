import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../ui/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private dialog: MatDialog = new MatDialog();
  
  public showLoading(message: string) {
    this.dialog.open(LoadingComponent, {
      hasBackdrop: true,
      disableClose: true,
      data: message,
      closeOnNavigation: true,
    });
  }

  public closeLoading() {
    this.dialog.closeAll();
  }


}
