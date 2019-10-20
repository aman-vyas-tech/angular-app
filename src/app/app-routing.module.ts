import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HerosComponent } from './heros/heros.component';
import { DashboardComponent}  from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full'},
{ path: 'heros/:id', component: HeroDetailComponent},
{ path: 'heros', component: HerosComponent},
{ path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
