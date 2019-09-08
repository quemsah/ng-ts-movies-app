import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { ThemeService } from "./shared/theme/theme.service";

declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // иначе даркмод начнется до прорисовки всего
    // и будет половина даркмод, половина нет
    $(document).ready(() => {
      // включен по умолчанию
      // enableDarkMode();
      $("#dark-mode").click(() => this.themeService.toggleDarkMode());
      // боковое меню
      $(".button-collapse").sideNav();
    });
    // Смена заголовка в зависимости от роута
    // https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          return child.snapshot.data.title
            ? child.snapshot.data.title
            : appTitle;
        })
      )
      .subscribe((ttl: string) => this.titleService.setTitle(ttl));
  }
}
