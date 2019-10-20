import { Component, OnInit } from '@angular/core';
import { HeroServiceService } from '../hero-service.service';
import { Hero } from './../heros/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public heros: Hero[];
  constructor(private heroService:  HeroServiceService) { }

  ngOnInit() {
    this.heroService.getHeros().subscribe( heros =>{
      this.heros = heros.slice(1, 3);
    }
       
    )
  }

}
