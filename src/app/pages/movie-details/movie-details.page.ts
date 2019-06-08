import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from './../../services/movie.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss']
})
export class MovieDetailsPage implements OnInit, OnDestroy {
  information = null;
  private movieSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private iab: InAppBrowser
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieSubscription = this.movieService
      .getDetails(id)
      .subscribe(result => {
        this.information = result;
      });
  }

  openWebsite() {
    this.iab.create(this.information.Website, '_system');
  }

  async ngOnDestroy() {
    if (this.movieSubscription) {
      await this.movieSubscription.unsubscribe();
    }
  }
}
