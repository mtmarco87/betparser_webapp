import { NgModule } from '@angular/core';
import { BetsComponent } from './components/bets/bets.component';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'environments/environment';


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  declarations: [
    BetsComponent
  ],
  exports: [
    BetsComponent
  ]
})
export class BetsModule { }
