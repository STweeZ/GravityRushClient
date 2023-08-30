import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule, MatCardModule, MatSnackBarModule, MatMenuModule,
  MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';
import {MaterialFileInputModule} from 'ngx-material-file-input';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MaterialFileInputModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MaterialFileInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MatDatepickerModule,
  ]
})

export class AngularMaterialModule {
}
