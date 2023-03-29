import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../models/pokemon-model.model';
import { PokemonService } from '../pokemon-service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  
  pokemonList = new Array<PokemonModel>();
  generacion : string;

  pokemonListPage = new Array<PokemonModel>();
  actualPokemonList = new Array<PokemonModel>();
  itemsPage = 5

  opcions =[5, 10, 25]
  
  constructor(
    private pokemonService: PokemonService,
    ){

    this.generacion = 'generation-i'
    }

  ngOnInit(): void {
    this.getPokemonList(this.generacion);
  }

  getPokemonList(generacion: string): void {
    this.pokemonService.API_GET_getPokeListByGen(generacion).subscribe((resp: PokemonModel[]) => {
      this.pokemonList = resp;
      this.pokemonListPage = this.pokemonList.slice(0, this.itemsPage)
      this.getPkmnDescription(this.pokemonListPage);
      this.actualPokemonList = this.pokemonListPage;
    },
    (err) => {
      console.log(err)
    });      
  }
  getPkmnDescription(pkmnList : Array<PokemonModel>){
    pkmnList.forEach(pkmn => {
      this.pokemonService.API_GET_getPokeRegionByUrl(pkmn.url).subscribe((resp: any) => {
        pkmn.descr = resp.flavor_text_entries[26].flavor_text
      });
    });
  }

  getPkmnDescriptionByPkm(pkmn : PokemonModel){
      this.pokemonService.API_GET_getPokeRegionByUrl(pkmn.url).subscribe((resp: any) => {
        pkmn.descr = resp.flavor_text_entries[26].flavor_text
      });
  }

  paginar(paginacion: any) {
    this.itemsPage = paginacion.pageSize
    let actual = paginacion.pageIndex * paginacion.pageSize
    this.pokemonListPage = this.pokemonList.slice(
      actual,
      actual + paginacion.pageSize
    );
    this.getPkmnDescription(this.pokemonListPage);
    this.actualPokemonList = this.pokemonListPage;
    
  }
  ordenar(){
    this.pokemonListPage.sort((a, b) => a.name > b.name ? 1 : -1);
  }

  borrar($event : PokemonModel) : void{
    let pokemon = $event;
    this.pokemonList.splice(this.pokemonList.indexOf(pokemon), 1)
    this.pokemonListPage = this.pokemonList.slice(0, this.itemsPage)
    this.actualPokemonList = this.pokemonListPage;
    this.getPkmnDescription(this.pokemonListPage)
  }

  filtrar(filterValue: string) : void{
    this.pokemonListPage = this.actualPokemonList
      this.pokemonListPage = this.pokemonListPage.filter((pokemon : PokemonModel) => {
       return pokemon.name.match(filterValue)
      })
      if (this.pokemonListPage.length == 0 ) {
        this.pokemonListPage = this.pokemonList.filter((pokemon : PokemonModel) => {
          this.getPkmnDescriptionByPkm(pokemon)
          return pokemon.name.match(filterValue)
         })
      }
  }

}
