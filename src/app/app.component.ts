import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ThemeService } from "./shared/services/theme/theme.service";
import { filter, map } from "rxjs/operators";

declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    public themeService: ThemeService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Смена заголовка в зависимости от роута
    // https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          return child.snapshot.data.title
            ? child.snapshot.data.title
            : this.titleService.getTitle();
        })
      )
      .subscribe((ttl: string) => this.titleService.setTitle(ttl));
  }

  ngAfterViewInit() {
    // Dark mode включен по умолчанию
    // this.themeService.toggleDarkMode();
    // $("#dark-mode").click(() => this.themeService.toggleDarkMode());

    // document.getElementById("dark-mode").addEventListener("click", () => {
    //   this.themeService.toggleDarkMode();
    // });

    // инициализация боковое меню
    $(".button-collapse").sideNav({ closeOnClick: true });
  }
}
