import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export class Config {
    public static SNACKBAR_SETTING = { 
        panelClass: 'mat-snackbar',
        duration: 2000, 
        verticalPosition: 'top' as MatSnackBarVerticalPosition
    }
}
