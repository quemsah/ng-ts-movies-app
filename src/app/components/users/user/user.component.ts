import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/services/user/user.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.userService.getUserInfo(id).subscribe(user => {
      //console.log(this.userService.isFriends(this.authService.userData.uid, user.uid));
      this.userData = user;
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
