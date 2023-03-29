import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';

const routes: Routes = [
  { path: 'vista-tabla',
    component: PokemonTableComponent },
  { path: 'vista-lista', component: PokemonListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
