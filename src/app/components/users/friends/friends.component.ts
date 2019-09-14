import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../shared/services/user/user.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {}

  handleAddFriend(form: NgForm) {
    this.userService.addFriend(form.value.friendsEmail);
    form.reset();
  }
}
