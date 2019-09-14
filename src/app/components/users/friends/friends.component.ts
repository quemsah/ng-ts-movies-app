import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../shared/services/user/user.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { Request } from "../../../shared/models/request";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  handleAddFriend(form: NgForm) {
    console.log(form.value);
    const now = new Date().toLocaleString();
    const uid = this.authService.userData.uid;
    const requestData: Request = {
      uid: uid,
      date: now,
      userEmail: form.value.friendsEmail,
      fid: ""
    };
    this.userService.addFriend(requestData);
    form.reset();
  }
}
