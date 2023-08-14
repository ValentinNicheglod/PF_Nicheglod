import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [InscriptionsComponent]
})

export class InscriptionsModule { }
