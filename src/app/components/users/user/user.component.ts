import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../../shared/models/user";
import { MovieListItem } from "../../../shared/models/movie-list-item";
import { UserService } from "../../../shared/services/user/user.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  userData: User;
  watchlater: MovieListItem;
  favourites: MovieListItem;

  constructor(
    public themeService: ThemeService,
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getMovieLists();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.userService.getUserInfo(id).subscribe(user => {
      // console.log(user);
      this.userData = user;
    });
  }
  // добавляем к айдишниками фильмов информацию о них
  getListInfo(listData: MovieListItem): void {
    Object.keys(listData).filter(key => {
      this.movieService.getMovieInfo(listData[key].mid).subscribe(data => {
        // берем только нужные поля
        listData[key].title = data.title;
        listData[key].director = data.director;
        listData[key].IMDBRating = data.IMDBRating;
        listData[key].posterLink = data.posterLink;
        listData[key].releaseDate = data.releaseDate;
        listData[key].director = data.director;
        listData[key].country = data.country;
      });
    });
  }

  getMovieLists(): void {
    const id = this.route.snapshot.paramMap.get("id");
    // const id = "me" ? this.authService.userData.uid : this.route.snapshot.paramMap.get("id");
    this.userService.fetchWatchLaterList(id).subscribe(data => {
      this.watchlater = data;
      this.getListInfo(this.watchlater);
    });
    this.userService.fetchFavouritesList(id).subscribe(data => {
      this.favourites = data;
      this.getListInfo(this.favourites);
    });
  }

  handleToWatchLater(event): void {
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

  handleToFavourites(event): void {
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
}
