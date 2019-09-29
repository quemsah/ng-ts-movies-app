import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { UserService } from "../../../shared/services/user/user.service";
import { Friends } from "../../../shared/models/friends";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit, AfterViewInit {
  friends: Friends;
  outRequests: Friends;
  inRequests: Friends;
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private userService: UserService,
    private movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    // todo: разобраться, почему не работает страничка
    // когда её насильно перезагружаешь
    // мб https://javebratt.com/firebase-user-undefined/
    // В некоторых случаях, если getFriends вызывается два раза
    // все работает хорошо даже после перезагрузки
    // this.getFriends();
  }

  ngAfterViewInit() {
    this.getFriends();
    // this.themeService.checkDarkMode();
  }

  filterObject = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  mapFriends = x => x.accepted === true;

  mapOutRequests = x => x.accepted === false && x.uid === x.initiator;

  mapInRequests = x => x.accepted === false && x.uid !== x.initiator;

  // добавляем к сухим айдишниками информацию о друзьях/запросах
  getFriendsInfo(friendsData: Friends): void {
    console.log("friendsData: ", friendsData);
    Object.keys(friendsData).filter(key => {
      this.userService.getUserInfo(friendsData[key].fid).subscribe(data => {
        if (data) {
          friendsData[key].displayName = data.displayName;
          friendsData[key].email = data.email;
          friendsData[key].photoURL = data.photoURL;
        }
      });
    });
  }

  getFriends(): void {
    this.authService
      .friendsRef()
      .valueChanges()
      .subscribe(data => {
        // разносим друзей и входящие/исходящие запросы
        // см. user.service.ts
        this.friends = this.filterObject(data, this.mapFriends);
        this.getFriendsInfo(this.friends);
        console.log("this.friends: ", this.friends);
        this.outRequests = this.filterObject(data, this.mapOutRequests);
        this.getFriendsInfo(this.outRequests);
        console.log("this.outRequests: ", this.outRequests);
        this.inRequests = this.filterObject(data, this.mapInRequests);
        this.getFriendsInfo(this.inRequests);
        console.log("this.inRequests: ", this.inRequests);
        this.spinner.hide();
      });
  }

  handleAddFriend(form: NgForm): void {
    if (form.value.friendsEmail.trim() !== this.authService.userData.email) {
      this.userService.addFriend(form.value.friendsEmail);
    }
    form.reset();
  }
  // удаляет и запросы в друзья и друзей в целом
  handleRequestDelete(event): void {
    const fid = this.movieService.getElementId(event);
    this.userService.deleteRequests(fid);
  }

  handleRequestAccept(event): void {
    const fid = this.movieService.getElementId(event);
    this.userService.acceptRequests(fid);
  }
}
