import { NgModule } from '@angular/core';
import { BetsAnalysisComponent } from './components/bets-analysis/bets-analysis.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'environments/environment';
import { BetsRoutes } from './bets.routing';
import { RouterModule } from '@angular/router';
import { SureBetsComponent } from './components/surebets/surebets.component';
import { BetsComponent } from './container/bets.component';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    CoreModule,
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
