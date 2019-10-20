import { Injectable } from '@angular/core';
import { Hero } from './heros/hero';
import { Heros } from './heros/mock-heros';
import { Observable, of } from 'rxjs'; 
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  private herosUrl = 'api/Heros';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeros() : Observable<Hero[]> {
   return this.http.get<Hero[]>(this.herosUrl).pipe(
     tap(_ => this.log('fetched Heros Successfully')),
     catchError(this.handleError<Hero[]>('getHeros', []))
   );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.herosUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log('hero fetched'),
      catchError(this.handleError<Hero>(`getHero id=${id}`)))
    );
    
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.herosUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero: ${hero.id}`),
      catchError(this.handleError<any>('Update Hero')))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.herosUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Hero Added: ${hero}`)),
      catchError(this.handleError<any>('Hero Added'))
    )
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.herosUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.herosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
