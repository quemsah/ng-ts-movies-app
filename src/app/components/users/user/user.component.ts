import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../shared/services/user/user.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  userData: any;
  watchlater: any;
  favourites: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getLists();
    //this.getMovieLists();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.userService.getUserInfo(id).subscribe(user => {
      console.log(user);
      this.userData = user;
    });
  }

  getLists() {
    const id = this.route.snapshot.paramMap.get("id");
    this.userService.fetchWatchLaterList(id).subscribe(data => {
      this.watchlater = data;
    });
    this.userService.fetchFavouritesList(id).subscribe(data => {
      this.favourites = data;
    });
  }

  // getFriendsInfo(friendsData: Friends) {
  //   console.log(friendsData);
  //   Object.keys(friendsData).filter(key => {
  //     this.userService.getUserInfo(friendsData[key].fid).subscribe(data => {
  //       friendsData[key].displayName = data.displayName;
  //       friendsData[key].email = data.email;
  //       friendsData[key].photoURL = data.photoURL;
  //     });
  //   });
  // }
}
