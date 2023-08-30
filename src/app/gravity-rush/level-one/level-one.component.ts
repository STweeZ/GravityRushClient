import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-level-one',
  templateUrl: './level-one.component.html',
  styleUrls: ['./level-one.component.css']
})

export class LevelOneComponent extends Phaser.Scene {

  player;
  platforms;
  lasers;
  isTouchDown;

  o2;
  nbO2;
  o2Container;
  o2Bar;
  o2Mask;
  timeEvent02;

  kit;
  nbKit;
  kitContainer;
  kitBar;
  kitMask;

  ship;
  lifeShip;
  shipContainer;
  shipBar;
  shipMask;
  timeEventShip;

  kraken;
  krakenAlive;
  lifeKraken;
  krakenContainer;
  krakenBar;
  krakenMask;

  cursors;
  spawnPlatforms;
  gameOver;
  win;
  time;
  score;

  constructor(private router: Router) {
    super({ key: 'levelOne' });
    this.router = router;
    // Nombre d'oxygene de départ
    this.nbO2 = 50;
    // Nombre de kits de départ
    this.nbKit = 100;
    // Debut de partie
    this.gameOver = false;
    this.win = false;
    // Coordonnees de spawn des plateformes
    // tslint:disable-next-line:max-line-length
    this.spawnPlatforms = [[[213.3, 213.3, 640, 1066.7, 1066.7], [-50, 550, 250, -50, 550]], [[213.3, 640, 640, 1066.7], [250, -50, 550, 250]]];
    this.lifeShip = 0;
    this.lifeKraken = 0;
    this.krakenAlive = true;
    this.isTouchDown = false;
    this.time = 0;
    this.score = 0;
  }

  create() {

    // L'ensemble des plateformes, des sols, et des murs
    this.platforms = this.physics.add.staticGroup();

    // La limite gauche de la carte
    this.platforms.create(-74.5, 360, 'Limit');

    // Construction du spawn -> Image de fond, sol, plateformes
    this.add.image(640, 360, 'Planet');
    this.platforms.create(-640, 1775, 'Ground');
    this.platforms.create(640, 1775, 'Ground');
    this.platforms.create(122, 684, 'Platform');
    this.platforms.create(522, 400, 'Platform');
    this.platforms.create(950, 200, 'Platform');

    // Construction du reste de la carte
    for (let i = 1; i < 10; i++) {
      // L'image de fond
      this.add.image(640 + i * 1280, 360, 'Planet' + (i % 2).toString());
      // Le sol
      this.platforms.create(640 + i * 1280, 1775, 'Ground');
      // Les plateformes
      if (i % 2 === 0) {
        for (let j = 0; j < 4; j++) {
          this.platforms.create(i * 1280 + this.spawnPlatforms[1][0][j], this.spawnPlatforms[1][1][j], 'Platform');
        }
      } else {
        for (let j = 0; j < 5; j++) {
          this.platforms.create(i * 1280 + this.spawnPlatforms[0][0][j], this.spawnPlatforms[0][1][j], 'Platform');
        }
      }
    }

    // Construction du final de la carte
    this.add.image(13440, 360, 'PlanetFinal');
    // La limite droite de la carte
    this.platforms.create(14154.5, 360, 'Limit2');
    this.platforms.create(13440, 1775, 'Ground');
    this.platforms.create(14720, 1775, 'Ground');
    for (let i = 0; i < 5; i++) {
      this.platforms.create(12982 + i * 244, 450, 'Platform');
    }

    this.ship = this.physics.add.staticGroup();
    this.ship.create(13800, 262, 'ShipBroken');

    this.kraken = this.physics.add.sprite(13600, 280, 'Kraken');
    this.kraken.setCollideWorldBounds(false);
    this.physics.add.collider(this.kraken, this.platforms);

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('Kraken', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'dead',
      frames: [ { key: 'Kraken', frame: 3 } ],
      repeat: -1
    });

    // Spritesheet du personnage
    this.player = this.physics.add.sprite(100, 555, 'Astronaut');

    // Les rebonds du personnage lorsqu'il atterit
    this.player.setBounce(0.2);
    // Collision avec les bords predefinis de la carte
    this.player.setCollideWorldBounds(false);
    // Collision entre le personnage et les plateformes
    this.physics.add.collider(this.player, this.platforms);

    // Camera qui suit le personnage
    this.cameras.main.startFollow(this.player);

    // Positionnement de la camera vis-a-vis du personnage
    this.cameras.main.followOffset.set(-455, 0);

    // Cursors qui va etre l'appui sur les touches du clavier
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('Astronaut', { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'Astronaut', frame: 5 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('Astronaut', { start: 6, end: 10 }),
      frameRate: 8,
      repeat: -1
    });

    // Spawn des bouteilles d'o2
    this.o2 = this.physics.add.group({
      key: 'o2',
      repeat: 6,
      setXY: { x: 175, y: 0, stepX: 1920 }
    });

    // tslint:disable-next-line:only-arrow-functions
    this.o2.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Collision des bouteilles avec les plateformes
    this.physics.add.collider(this.o2, this.platforms);

    // Spawn des kits de reparation
    this.kit = this.physics.add.group({
      key: 'Kit',
      repeat: 17,
      setXY: { x: 1920, y: -200, stepX: 640 }
    });

    // tslint:disable-next-line:only-arrow-functions
    this.kit.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Collision des kits avec les plateformes
    this.physics.add.collider(this.kit, this.platforms);

    // Lorsque le joueur entre en contact avec l'o2 et le kit on lance la fonction voulue
    this.physics.add.overlap(this.player, this.o2, this.collectO2, null, this);
    this.physics.add.overlap(this.player, this.kit, this.collectKit, null, this);
    this.physics.add.overlap(this.player, this.kraken, this.hitByKraken, null, this);

    this.setO2();
    this.setKit();
    this.setShip();
    this.setKraken();

    this.lasers = this.physics.add.group({
      defaultKey: 'Projectiles',
      maxSize: 50
    });

    this.physics.add.overlap(this.kraken, this.lasers, this.hitKraken, null, this);
    this.physics.add.overlap(this.platforms, this.lasers, this.hitUseless, null, this);
    this.physics.add.overlap(this.o2, this.lasers, this.hitUseless, null, this);
    this.physics.add.overlap(this.kit, this.lasers, this.hitUseless, null, this);
    this.physics.add.overlap(this.ship, this.lasers, this.hitUseless, null, this);
  }

  hitKraken(player, lasers) {
    lasers.destroy();

    this.lifeKraken++;
  }

  hitUseless(player, lasers) {
    lasers.destroy();
  }

  hitByKraken(player, kraken) {
    if (this.lifeKraken < 100) {
      this.nbO2 = this.nbO2 + 0.1;
    }
  }

  shoot() {
    const laser = this.lasers.get(this.player.x + 50, this.player.y + 10);
    if (laser) {
      laser.setActive(true);
      laser.setVisible(true);
      laser.body.setVelocityX(2000);
    }
  }

  touchDown() {
    this.shoot();
    this.isTouchDown = true;
  }

  touchUp() {
    this.isTouchDown = false;
  }

  timedEvent02() {
    this.nbO2++;
  }

  timedEventShip() {

    if (this.lifeKraken < 100) {
      this.lifeShip++;
    }
  }

  setO2() {
    // the energy container. A simple sprite
    this.o2Container = this.add.sprite(1280, 720, 'o2Container');

    // the energy bar. Another simple sprite
    this.o2Bar = this.add.sprite(this.o2Container.x + 46, this.o2Container.y, 'o2Bar');

    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.o2Mask = this.add.sprite(this.o2Bar.x, this.o2Bar.y, 'o2Bar');

    // ...it's not visible...
    this.o2Mask.visible = false;

    // and we assign it as energyBar's mask.
    this.o2Bar.mask = new Phaser.Display.Masks.BitmapMask(this, this.o2Mask);

    this.timeEvent02 = this.time.addEvent({ delay: 1000, callback: this.timedEvent02, callbackScope: this, loop: true });
  }

  setKit() {
    this.kitContainer = this.add.sprite(1280, 720, 'kitContainer');

    this.kitBar = this.add.sprite(this.kitContainer.x + 46, this.kitContainer.y, 'kitBar');

    this.kitMask = this.add.sprite(this.kitBar.x, this.kitBar.y, 'kitBar');

    this.kitMask.visible = false;

    this.kitBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.kitMask);
  }

  setShip() {
    // the energy container. A simple sprite
    this.shipContainer = this.add.sprite(1280, 720, 'shipContainer');

    // the energy bar. Another simple sprite
    this.shipBar = this.add.sprite(this.shipContainer.x + 46, this.shipContainer.y, 'shipBar');

    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.shipMask = this.add.sprite(this.shipBar.x, this.shipBar.y, 'shipBar');

    // ...it's not visible...
    this.shipMask.visible = false;

    // and we assign it as energyBar's mask.
    this.shipBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.shipMask);

    this.timeEventShip = this.time.addEvent({ delay: 2500, callback: this.timedEventShip, callbackScope: this, loop: true });
  }

  setKraken() {
    this.krakenContainer = this.add.sprite(1280, 720, 'krakenContainer');

    this.krakenBar = this.add.sprite(this.krakenContainer.x + 46, this.krakenContainer.y, 'krakenBar');

    this.krakenMask = this.add.sprite(this.krakenBar.x, this.krakenBar.y, 'krakenBar');

    this.krakenMask.visible = false;

    this.krakenBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.krakenMask);
  }

  preload() {
    // On va venir charger toutes les images necessaires dans ce niveau
    this.load.image('Planet', '../assets/gravityRush/level1/Planet.png');
    this.load.image('ShipBroken', '../assets/gravityRush/level1/ShipBroken.png');
    this.load.image('Limit', '../assets/gravityRush/level1/Limit.png');
    this.load.image('Limit2', '../assets/gravityRush/level1/Limit2.png');
    this.load.image('Planet1', '../assets/gravityRush/level1/Planet1.png');
    this.load.image('Planet0', '../assets/gravityRush/level1/Planet0.png');
    this.load.image('PlanetFinal', '../assets/gravityRush/level1/PlanetFinal.png');
    this.load.image('Ground', '../assets/gravityRush/level1/Ground.png');
    this.load.image('Platform', '../assets/gravityRush/level1/Platform.png');
    this.load.image('o2', '../assets/gravityRush/level1/O2.png');
    this.load.image('Kit', '../assets/gravityRush/level1/Kit.png');
    this.load.image('o2Bar', '../assets/gravityRush/level1/o2Bar.png');
    this.load.image('o2Container', '../assets/gravityRush/level1/o2Container.png');
    this.load.image('kitBar', '../assets/gravityRush/level1/kitBar.png');
    this.load.image('kitContainer', '../assets/gravityRush/level1/kitContainer.png');
    this.load.image('shipBar', '../assets/gravityRush/level1/shipBar.png');
    this.load.image('shipContainer', '../assets/gravityRush/level1/shipContainer.png');
    this.load.image('krakenBar', '../assets/gravityRush/level1/krakenBar.png');
    this.load.image('krakenContainer', '../assets/gravityRush/level1/krakenContainer.png');
    this.load.image('Projectiles', '../assets/gravityRush/level1/Projectiles.png');
    this.load.spritesheet('Kraken', '../assets/gravityRush/level1/Kraken.png', { frameWidth: 200, frameHeight: 231 });
    this.load.spritesheet('Astronaut', '../assets/gravityRush/level1/Spritesheet.png', { frameWidth: 80, frameHeight: 88 });
  }

  update() {

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-450);
    }

    if (this.cursors.space.isDown) {
      if (!this.isTouchDown) {
        this.touchDown();
      }
    } else {
      if (this.isTouchDown) {
        this.touchUp();
      }
    }

    if (this.player.y >= 1690) {
      this.player.x = 100;
      this.player.y = 555;
    }

    if (this.lifeKraken < 100) {
      this.kraken.anims.play('attack', true);
    } else {
      this.kraken.anims.play('dead', true);
    }

    if (this.lifeKraken >= 100 && this.player.x >= 13800 && this.nbKit <= 0) {
      this.win = true;
    }

    if (this.nbO2 === 100 || this.lifeShip === 100) {
      this.gameOver = true;
    }

    // tslint:disable-next-line:only-arrow-functions
    this.lasers.children.each(function(b) {
      if (b.y > 1775) {
        b.destroy();
      }
    }.bind(this));

    this.setCoordBars();

    if (this.gameOver) {
      // tslint:disable-next-line:max-line-length
      console.log('Ah dommage vous avez perdu, l\'astronaute est mort, son vaisseau détruit, la météorite va percuter la Terre et tout le monde va mourir.. Enfin bon tant pis c\'est de votre faute');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/gravityRush']));
    }

    if (this.win) {
      this.score = 10000 + (100 - this.nbO2) * 23000 + (100 - this.nbKit) * 13000 - (this.time * 5000);
      // tslint:disable-next-line:max-line-length
      console.log('Bravo vous avez réussi à rejoindre votre vaisseau, à le réparer et à décoler tranquille !! Mais.. vous êtes un dieu en fait ????');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/gravityRush']));
    }
  }

  setCoordBars() {

    const cam = this.cameras.main;

    this.o2Container.x = cam.midPoint.x - 460;
    this.o2Bar.x = cam.midPoint.x - 460 + 25;
    this.o2Mask.x = cam.midPoint.x - 460 + 25 - (this.o2Mask.displayWidth / 100) * this.nbO2;

    this.o2Container.y = cam.midPoint.y - 320;
    this.o2Bar.y = cam.midPoint.y - 320;
    this.o2Mask.y = cam.midPoint.y - 320;

    this.kitContainer.x = cam.midPoint.x - 460;
    this.kitBar.x = cam.midPoint.x - 460 + 25;
    this.kitMask.x = cam.midPoint.x - 460 + 25 - (this.kitMask.displayWidth / 100) * this.nbKit;

    this.kitContainer.y = cam.midPoint.y - 270;
    this.kitBar.y = cam.midPoint.y - 270;
    this.kitMask.y = cam.midPoint.y - 270;

    if (this.krakenAlive === true) {

      this.shipContainer.x = cam.midPoint.x - (- 460);
      this.shipBar.x = cam.midPoint.x - (- 460) - 25;
      this.shipMask.x = cam.midPoint.x - (- 460) - 25 - (this.shipMask.displayWidth / 100) * this.lifeShip;

      this.shipContainer.y = cam.midPoint.y - 270;
      this.shipBar.y = cam.midPoint.y - 270;
      this.shipMask.y = cam.midPoint.y - 270;
    }

    this.krakenContainer.x = cam.midPoint.x - (- 460);
    this.krakenBar.x = cam.midPoint.x - (- 460) - 25;
    this.krakenMask.x = cam.midPoint.x - (- 460) - 25 - (this.krakenMask.displayWidth / 100) * this.lifeKraken;

    this.krakenContainer.y = cam.midPoint.y - 320;
    this.krakenBar.y = cam.midPoint.y - 320;
    this.krakenMask.y = cam.midPoint.y - 320;
  }

  collectO2(player, o2) {
    o2.disableBody(true, true);

    this.nbO2 = 0;
  }

  collectKit(player, kit) {
    kit.disableBody(true, true);

    if (this.nbKit > 0) {
      this.nbKit -= 15;
    }
    if (this.nbKit < 0) {
      this.nbKit = 0;
    }
  }
}
