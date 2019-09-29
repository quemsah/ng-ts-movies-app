// это нигде не используется

filterFriendsData = (obj, predicate) =>
  Object.keys(obj)
  .filter(key => predicate(obj[key]))
  .reduce((res, key) => ((res[key] = obj[key]), res), {});

var fdata = [{
    accepted: false,
    date: "14.09.2019, 16:52:19",
    fid: "FOd0LBh9dlPqLYbjCPZy2vLov2O2",
    initiator: "wuUzmAiaDwY1PxlaOKfMjhJi66L2",
    uid: "wuUzmAiaDwY1PxlaOKfMjhJi66L2"
  },
  {
    accepted: false,
    date: "14.09.2019, 14:21:12",
    fid: "ZFlEFPH2ymdvjNaR0bE2vUTGtBj1",
    initiator: "wuUzmAiaDwY1PxlaOKfMjhJi66L2",
    uid: "wuUzmAiaDwY1PxlaOKfMjhJi66L2"
  },
  {
    accepted: false,
    date: "14.09.2019, 14:00:55",
    fid: "ZOI3J5Omy4WjhXKcuwRMqE7JYSU2",
    initiator: "ZOI3J5Omy4WjhXKcuwRMqE7JYSU2",
    uid: "wuUzmAiaDwY1PxlaOKfMjhJi66L2"
  }
];

var udata = {
  "displayName": "Евгений",
  "email": "quemsaurose@gmail.com",
  "emailVerified": true,
  "photoURL": "https://firebasestorage.googleapis.com/v0/b/ng-auth-dc645.appspot.com/o/users%2FFOd0LBh9dlPqLYbjCPZy2vLov2O2%2F9230e1f5a3e52e40b74214e9de35d4944dd0afcc_full.jpg?alt=media&token=db584f62-5d77-4dd7-8c91-631e46e8e276",
  "uid": "FOd0LBh9dlPqLYbjCPZy2vLov2O2"
}

Object.keys(fdata).filter(key => {
  console.log(fdata[key].fid)
  fdata[key].displayName = udata.displayName;
});
console.log(udata);

var friends = filterFriendsData(data, x => x.accepted == true);
console.log(friends);
var outReq = filterFriendsData(
  data,
  x => x.accepted == false && x.uid == x.initiator
);
console.log(outReq);
var inReq = filterFriendsData(
  data,
  x => x.accepted == false && x.uid !== x.initiator
);
console.log(inReq);
console.log(data);