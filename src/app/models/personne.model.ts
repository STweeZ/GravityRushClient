import {User} from './user.model';

export class Personne {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  actif: boolean;
  devise: string;
  avatar?: string;
  user: User;

  constructor(id: number, nom: string, prenom: string, pseudo: string, actif: boolean, devise: string, avatar: string, user: User) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.pseudo = pseudo;
    this.actif = actif;
    this.devise = devise;
    this.avatar = avatar;
    this.user = user;
  }

  static parse(personne: any) {
    const user = User.parse(personne);
    console.log('User : ', user);
    return new Personne(personne.id, personne.nom,
      personne.prenom, personne.pseudo,
      personne.actif, personne.devise,
      personne.avatar, user);
  }
}

