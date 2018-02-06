import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';


const allModules = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatExpansionModule
];

@NgModule({
  imports: allModules,
  exports: allModules,
})
export class MaterialModule { }
