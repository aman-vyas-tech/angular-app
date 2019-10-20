import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heros/hero';
import { HeroServiceService } from '../hero-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  public selectedHero: Hero;

  constructor(private heroService: HeroServiceService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe( hero => {
      this.selectedHero = hero;
      console.log(this.selectedHero);
    }) 
  }

  save(): void{
    this.heroService.updateHero(this.selectedHero).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
