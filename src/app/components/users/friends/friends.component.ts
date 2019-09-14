import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../shared/services/user/user.service";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  //убрать any
  friends: any;
  outRequests: any;
  inRequests: any;
  constructor(
    public authService: AuthService,
    private userService: UserService
  ) {}

  filterObject = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});
  mapFriends = x => x.accepted == true;
  mapOutRequests = x => x.accepted === false && x.uid === x.initiator;
  mapInRequests = x => x.accepted === false && x.uid !== x.initiator;

  ngOnInit() {
    this.getFriends();
  }

  getUserInfo(uid: string): void {
    this.userService.fetchUserInfo(uid).valueChanges().subscribe(data => {
      console.log(data);
    });
  }

  getFriends(): void {
    this.authService.friendsRef.valueChanges().subscribe(data => {
      this.friends = this.filterObject(data, this.mapFriends);
      this.outRequests = this.filterObject(data, this.mapOutRequests);
      this.inRequests = this.filterObject(data, this.mapInRequests);
      console.log(this.friends);
      console.log(this.outRequests);
      console.log(this.inRequests);
      this.getUserInfo('FOd0LBh9dlPqLYbjCPZy2vLov2O2');
    });
  }

  handleAddFriend(form: NgForm) {
    this.userService.addFriend(form.value.friendsEmail);
    form.reset();
  }
}
