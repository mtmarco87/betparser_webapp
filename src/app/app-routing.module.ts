import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { BetsListComponent } from './features/bets/containers/bets-list/bets-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'bets', component: BetsListComponent },
    { path: 'others', component: HomeComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

// Children routing example:
// {
//     path: '', 
//     children: [
//         { path: '', redirectTo: 'home', pathMatch: 'full' },
//         { path: 'home', component: HomeComponent },
//         { path: 'bets', component: BetsListComponent },
//         { path: '**', redirectTo: 'home', pathMatch: 'full' }
//      ]
//   },
