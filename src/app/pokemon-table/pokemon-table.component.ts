import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonModel } from '../models/pokemon-model.model';
import { MatTableDataSource } from '@angular/material/table'  
import { GenerationModel } from '../models/generation-model.model';
import { PokemonService } from '../pokemon-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css']
})
export class PokemonTableComponent implements OnInit {

  dataSource: MatTableDataSource<PokemonModel>;

  displayedColumns: string[] = ['name', 'delete'];

  pokemonList = new Array<PokemonModel>();
  generationData = new GenerationModel();
  generacion : string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _liveAnnouncer: LiveAnnouncer,
    private pokemonService: PokemonService,
    ){

    this.generacion = 'generation-i'
  }
  ngOnInit(): void {
    this.getPokemonList(this.generacion)
  }

  /**
 * Trae la lista de pokemon segun Generación
 * @param  {string} generacion 
 * @return {void}@memberof AppComponent
 */
  getPokemonList(generacion: string): void {
    this.pokemonService.API_GET_getPokeListByGen(generacion).subscribe((resp: PokemonModel[]) => {
      this.pokemonList = resp;
      this.dataSource = new MatTableDataSource(this.pokemonList);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 1000);
    },
    (err) => {
      console.log(err)
    });      
  }
  
  filtrar(filterValue: string) : void{
    this.dataSource.filter = filterValue.trim();
  }

  borrarPokemon(pokemon : PokemonModel) : void{
    this.dataSource.data.splice(this.dataSource.data.indexOf(pokemon), 1)
    this.dataSource._updateChangeSubscription();
  }



}
