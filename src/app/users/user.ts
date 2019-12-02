export class User {
  id: number;
  username: string;
  password: string;
  enabled: boolean;
  email: string;
  roles:string[] = [];
}
