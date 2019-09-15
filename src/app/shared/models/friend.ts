export interface Friend {
  uid: string;
  initiator: string;
  date: string;
  accepted: boolean;
  fid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}
