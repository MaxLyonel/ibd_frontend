import { Routes } from "@angular/router";
import RegistroComponent from "./director-record/register2.component";
import BachelorsComponent from "./consolidate-bachelors/bachelors.component";




export const IBD: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      { path: 'actualizar-datos', component: RegistroComponent },
      { path: 'consolidar-bachilleres', component: BachelorsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
]