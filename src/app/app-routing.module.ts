import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';


const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "",
      component: AdminLayoutComponent,
      children: [
          { path: "", loadChildren: "./layouts/admin-layout/admin-layout.module#AdminLayoutModule" }
      ]
    },
    { path: '',
      component: AuthLayoutComponent,
      children: [
          { path: '', loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule' }
      ]
    },
    { path: '',
      component: HomeLayoutComponent,
      children: [
          { path: '', loadChildren: './layouts/home-layout/home-layout.module#HomeLayoutModule' }
      ]
    },
    { path: "**", redirectTo: "home" }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
