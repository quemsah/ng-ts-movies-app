import { Component, OnInit } from "@angular/core";
import { StarRatingComponent } from "ng-starrating";
import { NgxSpinnerService } from "ngx-spinner";
import { MovieListItem } from "../../../shared/models/movie-list-item";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { UserService } from "../../../shared/services/user/user.service";

@Component({
  selector: "app-rated",
  templateUrl: "./rated.component.html",
  styleUrls: ["./rated.component.css"]
})
export class RatedComponent implements OnInit {
  public rated: MovieListItem;
  constructor(
    public themeService: ThemeService,
    public authService: AuthService,
    private userService: UserService,
    private movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.spinner.show();
    this.getRatedList();
  }
  // добавляем к айдишкникам информацию о фильмах
  public getRatedListInfo(listData: MovieListItem): void {
    Object.keys(listData).filter((key) => {
      this.movieService.getMovieInfo(listData[key].mid).subscribe((data) => {
        // берем только нужные поля
        listData[key].title = data.title;
        listData[key].director = data.director;
        listData[key].IMDBRating = data.IMDBRating;
        listData[key].posterLink = data.posterLink;
        listData[key].director = data.director;
        this.spinner.hide();
      });
    });
  }

  public getRatedList(): void {
    this.userService.fetchRatedList().subscribe((data) => {
      this.rated = data;
      console.log("this.rated: ", this.rated);
      this.getRatedListInfo(this.rated);
    });
  }

  public handleToWatchLater(event): void {
    const watchLaterMovieData: MovieListItem = {
      mid: this.movieService.getElementId(event),
      date: new Date().toLocaleString()
    };
    this.movieService.toggleMovieToList(
      "watchlater",
      watchLaterMovieData,
      this.authService.userData.uid
    );
  }

  public handleToFavourites(event): void {
    const favouriteMovieData: MovieListItem = {
      mid: this.movieService.getElementId(event),
      date: new Date().toLocaleString()
    };
    this.movieService.toggleMovieToList(
      "favourites",
      favouriteMovieData,
      this.authService.userData.uid
    );
  }

  public handleRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }): void {
    // получаем id фильма (родительский элемент star-rating)
    // tslint:disable-next-line: deprecation
    const el = event.currentTarget as HTMLInputElement;
    const attr = el.parentElement.parentElement;
    const ratedMovieData: MovieListItem = {
      mid: attr.id,
      date: new Date().toLocaleString(),
      rated: $event.newValue
    };
    this.movieService.toggleMovieToList("rated", ratedMovieData, this.authService.userData.uid);
  }
}
