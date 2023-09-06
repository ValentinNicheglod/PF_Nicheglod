import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { inscriptionsFeature } from './store/inscriptions.reducer';

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects])
  ],
  exports: [InscriptionsComponent]
})

export class InscriptionsModule { }
