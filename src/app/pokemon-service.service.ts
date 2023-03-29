import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GenerationModel } from './models/generation-model.model';
import { PokemonModel } from './models/pokemon-model.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private httpClient: HttpClient
    ) {}

   /**
    * Llamada por get para listar pokemones segun region
    * @param  {string} region 
    * @return 
    * @memberof PokemonService
    */
   API_GET_getPokeListByGen(region : string): Observable<PokemonModel[]>{
    return this.httpClient.get<GenerationModel>(environment.apiEndpoint + 'generation/' + region, httpOptions)
    .pipe(
      map(result => result['pokemon_species']),
      catchError(this.handleError),
    );
   }

   API_GET_getPokeRegionByUrl(url: string): Observable<PokemonModel>{
    return this.httpClient.get<PokemonModel>(url, httpOptions)
    .pipe(
      catchError(this.handleError),
    );
   }

   API_GET_getPokemonById(id: number): Observable<PokemonModel>{
    return this.httpClient.get<PokemonModel>(environment.apiEndpoint + 'pokemon/'+ id, httpOptions)
    .pipe(
      catchError(this.handleError),
    );
   }

/**
 * Manejo de error
 * @param  {*} error 
 * @return 
 * @memberof PokemonService
 */
handleError(error : any) {    
    let errorMessage = '';
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    return throwError(errorMessage);
  }

}
