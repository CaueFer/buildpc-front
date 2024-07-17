import { Routes } from '@angular/router';
import { MontarComponent } from './pages/montar/montar.component';
import { HorizontalNavComponent } from './layouts/horizontal-nav/horizontal-nav.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path: 'home',  component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: HorizontalNavComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'montar', component: MontarComponent },
      { path: 'cadastro', component: CadastroComponent },
    ],
  },
];
