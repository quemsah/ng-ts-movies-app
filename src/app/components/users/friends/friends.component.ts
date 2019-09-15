import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../shared/services/user/user.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { Observable } from "rxjs";

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

  getFriendsInfo(friendsData: any) {
    Object.keys(friendsData).filter(key => {
      this.userService.getUserInfo(friendsData[key].fid).subscribe(data => {
        friendsData[key].displayName = data.displayName;
        friendsData[key].email = data.email;
        friendsData[key].photoURL = data.photoURL;
      });
    });
  }

  getFriends(): void {
    this.authService.friendsRef.valueChanges().subscribe(data => {
      // разносим друзей и входящие/исходящие запросы
      // см. user.service.ts
      this.friends = this.filterObject(data, this.mapFriends);
      this.outRequests = this.filterObject(data, this.mapOutRequests);
      this.inRequests = this.filterObject(data, this.mapInRequests);
      this.getFriendsInfo(this.friends);
      this.getFriendsInfo(this.outRequests);
      this.getFriendsInfo(this.inRequests);
      // console.log(this.friends);
      // console.log(this.outRequests);
      // console.log(this.inRequests);
    });
  }

  handleAddFriend(form: NgForm) {
    this.userService.addFriend(form.value.friendsEmail);
    form.reset();
  }

  handleRequestDelete(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const fid = target.attributes.id.nodeValue;
    this.userService.deleteRequests(fid);
  }
}
