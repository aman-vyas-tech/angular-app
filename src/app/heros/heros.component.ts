import { Component, OnInit } from '@angular/core';
import { Heros } from './mock-heros';
import { Hero } from './hero';
import { HeroServiceService } from '../hero-service.service';


@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})
export class HerosComponent implements OnInit {
  
  public heros = Heros;
  public selectedHero: Hero;
  
  constructor(private heroService: HeroServiceService) { }

  ngOnInit() {
    this.heroService.getHeros().subscribe(heros => {
      this.heros = heros;
    });

  }

  onSelectedHero(hero: Hero){
    this.selectedHero = hero;
  }

  add(name: string) {
    name = name.trim();
    if(!name) { return;}
    this.heroService.addHero({name} as Hero).subscribe((hero) => this.heros.push(hero));
  }

  delete(hero : Hero){
    this.heros = this.heros.filter(h =>h != hero );
    this.heroService.deleteHero(hero).subscribe();
  }

}