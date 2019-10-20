import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './heros/hero';
import { Injectable } from '@angular/core';
import { Heros } from './heros/mock-heros';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const Heros: Hero[] =[
      { id : 0, name: "Hero"},
      { id : 1, name: "Aman"},
      { id : 2, name: "Krishna"},
      { id : 3, name: "Shiva"},
      { id : 4, name: "Batman"},
      { id : 5, name: "Superman"},
      { id : 6, name: "Ram"},
      { id : 7, name: "Arjun"}
  ];

  return {Heros};
  }

  genId(heros: Hero[]): number {
    return Heros.length >0 ? Math.max(...Heros.map(hero => hero.id)) +1 :11;
  }
}
