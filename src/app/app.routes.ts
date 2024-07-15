import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HorizontalNavComponent } from './layouts/horizontal-nav/horizontal-nav.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path: 'home',  component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: HorizontalNavComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', component: AdminComponent },
    ],
  },
];
