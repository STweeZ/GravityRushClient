export class Tache {
  id: number;
  jeu: string;
  player: string;
  score: number;
  description: string;
  date: Date;

  constructor(id: number, jeu: string, player: string, score: number, description: string, date: Date) {
    this.id = id;
    this.jeu = jeu;
    this.player = player;
    this.score = score;
    this.description = description;
    this.date = date;
  }

  static parse(tache: any) {
    return new Tache(tache.id, tache.jeu,
      tache.player, tache.score, tache.description,
      tache.date);
  }
}
