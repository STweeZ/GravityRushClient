import {Component} from '@angular/core';
import * as Phaser from 'phaser';
import {LevelOneComponent} from './level-one/level-one.component';
import {LevelTwoComponent} from './level-two/level-two.component';
import {Router} from '@angular/router';


interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game;
}

@Component({
  selector: 'app-gravity-rush',
  templateUrl: './gravity-rush.component.html',
  styleUrls: ['./gravity-rush.component.css']
})

export class GravityRushComponent {
  title = 'GravityRush';
  initialize = false;
  game: GameInstance;
  router: Router;
  levelOne: LevelOneComponent;
  levelTwo: LevelTwoComponent;

  constructor(router: Router) {
    this.router = router;
    this.levelOne = new LevelOneComponent(router);
    this.levelTwo = new LevelTwoComponent(router);
  }

  firstLevel() {
    this.game = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      scene: this.levelOne,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      instance: null,
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 300},
          debug: false
        }
      }
    };
  }

  secondLevel() {
    this.game = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      scene: this.levelTwo,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      instance: null,
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0},
          debug: false
        }
      }
    };
  }

  getInstance() {
    return this.game.instance;
  }

  initializeGame(level: string) {
    if (level === 'firstLevel') {
      this.firstLevel();
    } else {
      this.secondLevel();
    }
    this.initialize = true;
  }
}
