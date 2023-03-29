import { PokemonModel } from "./pokemon-model.model";

export class GenerationModel {
  pokemon_species: PokemonModel[];

  constructor(){
    this.pokemon_species = new Array<PokemonModel>();
  }
}
