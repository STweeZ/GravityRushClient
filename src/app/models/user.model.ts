export class User {
  id: number;
  name: string;
  email: string;
  role: string[];
  accessToken: string;
  tokenType: string;
  expiresIn: number;

  constructor(id: number,
              name: string,
              email: string,
              role: string[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static parse(personne: any) {
    return new User(personne.user.id, personne.user.name,
      personne.user.email, personne.user.role
    );
  }
}
