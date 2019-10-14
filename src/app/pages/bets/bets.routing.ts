import { Routes } from "@angular/router";
import { BetsAnalysisComponent } from './components/bets-analysis/bets-analysis.component';
import { SureBetsComponent } from './components/surebets/surebets.component';


export const BetsRoutes: Routes = [
  { path: "analysis", component: BetsAnalysisComponent },
  { path: "surebets", component: SureBetsComponent }
];
