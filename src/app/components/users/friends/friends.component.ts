import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Friends } from "../../../shared/models/friends";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { UserService } from "../../../shared/services/user/user.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit, AfterViewInit {
  public friends: Friends;
  public outRequests: Friends;
  public inRequests: Friends;
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private userService: UserService,
    private movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.spinner.show();
    this.getFriends();
  }

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  public filterObject = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {})

  public mapFriends = (x) => x.accepted === true;

  public mapOutRequests = (x) => x.accepted === false && x.uid === x.initiator;

  public mapInRequests = (x) => x.accepted === false && x.uid !== x.initiator;
  // добавляем к сухим айдишниками информацию о друзьях/запросах
  public getFriendsInfo(friendsData: Friends): void {
    console.log("friendsData: ", friendsData);
    Object.keys(friendsData).filter((key) => {
      this.userService.getUserInfo(friendsData[key].fid).subscribe((data) => {
        if (data) {
          friendsData[key].displayName = data.displayName;
          friendsData[key].email = data.email;
          friendsData[key].photoURL = data.photoURL;
        }
      });
    });
  }

  public getFriends(): void {
    this.authService
      .friendsRef()
      .valueChanges()
      .subscribe((data) => {
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

  public handleAddFriend(form: NgForm): void {
    if (form.value.friendsEmail.trim() !== this.authService.userData.email) {
      this.userService.addFriend(form.value.friendsEmail);
    }
    form.reset();
  }
  // удаляет и запросы в друзья и друзей в целом
  public handleRequestDelete(event): void {
    const fid = this.movieService.getElementId(event);
    this.userService.deleteRequests(fid);
  }

  public handleRequestAccept(event): void {
    const fid = this.movieService.getElementId(event);
    this.userService.acceptRequests(fid);
  }
}
