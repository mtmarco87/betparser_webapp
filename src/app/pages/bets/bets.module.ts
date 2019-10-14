import { NgModule } from '@angular/core';
import { BetsAnalysisComponent } from './components/bets-analysis/bets-analysis.component';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'environments/environment';
import { BetsRoutes } from './bets.routing';
import { RouterModule } from '@angular/router';
import { SureBetsComponent } from './components/surebets/surebets.component';
import { BetsComponent } from './container/bets.component';


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forChild(BetsRoutes)
  ],
  declarations: [
    BetsComponent, BetsAnalysisComponent, SureBetsComponent
  ],
  exports: [
    BetsComponent
  ]
})
export class BetsModule { }
