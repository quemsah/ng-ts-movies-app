import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../shared/services/user/user.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MovieService } from "../../../shared/services/movie/movie.service";

@Component({
  selector: "app-rated",
  templateUrl: "./rated.component.html",
  styleUrls: ["./rated.component.css"]
})
export class RatedComponent implements OnInit {
  rated: any;
  constructor(
    public themeService: ThemeService,
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.getRatedList();
  }
  // добавляем к айдишкникам информацию о фильмах
  getRatedListInfo(listData: any): void {
    Object.keys(listData).filter(key => {
      this.movieService.getMovieInfo(listData[key].mid).subscribe(data => {
        // берем только нужные поля
        listData[key].title = data.title;
        listData[key].director = data.director;
        listData[key].IMDBRating = data.IMDBRating;
        listData[key].posterLink = data.posterLink;
        listData[key].director = data.director;
      });
    });
  }

  getRatedList(): void {
    this.userService.fetchRatedList().subscribe(data => {
      this.rated = data;
      this.getRatedListInfo(this.rated);
      console.log(data);
    });
  }
}
