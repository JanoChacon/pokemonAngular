import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonModel } from '../models/pokemon-model.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon: PokemonModel = new PokemonModel; 

  @Output() deleteEvent = new EventEmitter<PokemonModel>();

  constructor( 
      
    ) { }

  ngOnInit(): void {

  }

  borrar(){
    this.deleteEvent.emit(this.pokemon)
  }

}
