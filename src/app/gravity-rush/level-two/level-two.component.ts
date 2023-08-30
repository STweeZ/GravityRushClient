import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import {Router} from "@angular/router";

@Component({
  selector: 'app-level-two',
  templateUrl: './level-two.component.html',
  styleUrls: ['./level-two.component.css']
})

export class LevelTwoComponent extends Phaser.Scene {

  spaceship;
  impacts;
  asteroids;
  lasers;
  isTouchDown;

  fuel;
  nbFuel;
  fuelContainer;
  fuelBar;
  fuelMask;
  timeEventFuel;

  ammo;
  nbAmmo;
  ammoContainer;
  ammoBar;
  ammoMask;

  lifeEarth;
  earthContainer;
  earthBar;
  earthMask;
  timeEventEarth;

  meteor;
  meteorAlive;
  lifeMeteor;
  meteorContainer;
  meteorBar;
  meteorMask;

  cursors;
  spawnAsteroids;
  gameOver;
  win;
  time;
  score;

  constructor(private router: Router) {
    super({ key: 'levelTwo' });
    this.router = router;
    // Essence de départ
    this.nbFuel = 20;
    // Nombre de munitions de départ
    this.nbAmmo = 80;
    // Debut de partie
    this.gameOver = false;
    this.win = false;
    // Coordonnees de spawn des meteores
    // tslint:disable-next-line:max-line-length
    this.spawnAsteroids = [[[213.3, 640, 640, 1066.7, 213.3, 213.3, 640, 1066.7, 1066.7, 213.3, 640, 640, 1066.7], [-650, -950, -350, -650, -50, 550, 250, -50, 550, 1150, 850, 1450, 1150]], [[213.3, 213.3, 640, 1066.7, 1066.7, 213.3, 640, 640, 1066.7, 213.3, 213.3, 640, 1066.7, 1066.7], [-950, -350, -650, -950, -350, 250, -50, 550, 250, 850, 1450, 1150, 850, 1450]]];
    this.lifeEarth = 0;
    this.lifeMeteor = 0;
    this.meteorAlive = true;
    this.isTouchDown = false;
    this.time = 0;
    this.score = 0;
  }

  create() {

    this.impacts = this.physics.add.staticGroup();
    this.add.image(640, 360, 'Space');
    this.impacts.create(75, 360, 'Limit');
    this.impacts.create(640, -630, 'Ground');
    this.impacts.create(640, 1370, 'Ground');
    for (let i = 1; i < 12; i++) {
      this.add.image(640 + i * 1280, 360, 'Space' + (i % 2).toString());
      this.impacts.create(640 + i * 1280, -630, 'Ground');
      this.impacts.create(640 + i * 1280, 1370, 'Ground');
    }
    this.add.image(13440, 360, 'SpaceFinal');
    this.impacts.create(14300, 360, 'Limit2');
    this.impacts.create(13440, -630, 'Ground');
    this.impacts.create(13440, 1370, 'Ground');

    this.asteroids = this.physics.add.staticGroup();
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < 13; j++) {
          this.asteroids.create(i * 1280 + this.spawnAsteroids[1][0][j], this.spawnAsteroids[1][1][j], 'Asteroids');
        }
      } else {
        for (let j = 0; j < 14; j++) {
          this.asteroids.create(i * 1280 + this.spawnAsteroids[0][0][j], this.spawnAsteroids[0][1][j], 'Asteroids');
        }
      }
    }

    this.meteor = this.physics.add.sprite(13600, 360, 'Meteor');

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('Meteor', { start: 0, end: 11 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'explode',
      frames: [ { key: 'Meteor', frame: 0 } ],
      repeat: -1
    });

    // Spritesheet du personnage
    // this.spaceship = this.physics.add.sprite(300, 400, 'SpaceShip');
    this.spaceship = this.physics.add.sprite(250, 360, 'SpaceShip');

    // Collision avec les bords predefinis de la carte
    this.spaceship.setCollideWorldBounds(false);
    // Collision entre le personnage et les plateformes
    this.physics.add.collider(this.spaceship, this.impacts);
    this.physics.add.collider(this.spaceship, this.asteroids);

    // Camera qui suit le personnage
    this.cameras.main.startFollow(this.spaceship);

    // Positionnement de la camera vis-a-vis du personnage
    this.cameras.main.followOffset.set(-455, 0);

    // Cursors qui va etre l'appui sur les touches du clavier
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'upRight',
      frames: this.anims.generateFrameNumbers('SpaceShip', { start: 8, end: 9 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'upLeft',
      frames: this.anims.generateFrameNumbers('SpaceShip', { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'downRight',
      frames: this.anims.generateFrameNumbers('SpaceShip', { start: 10, end: 11 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'downLeft',
      frames: this.anims.generateFrameNumbers('SpaceShip', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('SpaceShip', { start: 6, end: 7 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('SpaceShip', { start: 4, end: 5 }),
      frameRate: 8,
      repeat: -1
    });

    // Spawn des bouteilles d'o2
    this.fuel = this.physics.add.group({
      key: 'Fuel',
      repeat: 6,
      setXY: { x: 2560, y: 0, stepX: 2560 }
    });

    // tslint:disable-next-line:only-arrow-functions
    this.fuel.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Spawn des kits de reparation

    this.ammo = this.physics.add.group({
      key: 'Ammo',
      repeat: 17,
      setXY: { x: 960, y: 800, stepX: 1920 }
    });

    // tslint:disable-next-line:only-arrow-functions
    this.ammo.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Lorsque le joueur entre en contact avec l'o2 et le kit on lance la fonction voulue
    this.physics.add.overlap(this.spaceship, this.fuel, this.collectFuel, null, this);
    this.physics.add.overlap(this.spaceship, this.ammo, this.collectAmmo, null, this);
    this.physics.add.overlap(this.spaceship, this.meteor, this.hitByMeteor, null, this);

    this.setFuel();
    this.setAmmo();
    this.setEarth();
    this.setMeteor();

    this.lasers = this.physics.add.group({
      defaultKey: 'Projectiles',
      maxSize: 50
    });

    this.physics.add.overlap(this.meteor, this.lasers, this.hitMeteor, null, this);
    this.physics.add.overlap(this.asteroids, this.lasers, this.hitAsteroids, null, this);
    this.physics.add.overlap(this.fuel, this.lasers, this.hitUseless, null, this);
    this.physics.add.overlap(this.ammo, this.lasers, this.hitUseless, null, this);
  }

  hitMeteor(spaceship, lasers) {
    lasers.destroy();

    this.lifeMeteor++;
  }

  hitUseless(spaceship, lasers) {
    lasers.destroy();
  }

  hitByMeteor(spaceship, meteor) {
    if (this.lifeMeteor < 100) {
      this.nbFuel = this.nbFuel + 0.1;
    }
  }

  hitAsteroids(asteroids, lasers) {
    asteroids.disableBody(true, true);
    lasers.destroy();
  }

  shoot() {
    const laser = this.lasers.get(this.spaceship.x + 50, this.spaceship.y + 10);
    if (laser && (this.nbAmmo < 100)) {
      this.nbAmmo = this.nbAmmo + 1;
      laser.setActive(true);
      laser.setVisible(true);
      laser.body.setVelocityX(6000);
    } else {
      laser.destroy();
    }
  }

  touchDown() {
    this.shoot();
    this.isTouchDown = true;
  }

  touchUp() {
    this.isTouchDown = false;
  }

  timedEventFuel() {
    this.nbFuel++;
  }

  timedEventEarth() {

    if (this.lifeMeteor < 100) {
      this.lifeEarth++;
    }
  }

  setFuel() {
    // the energy container. A simple sprite
    this.fuelContainer = this.add.sprite(1280, 720, 'fuelContainer');

    // the energy bar. Another simple sprite
    this.fuelBar = this.add.sprite(this.fuelContainer.x + 46, this.fuelContainer.y, 'fuelBar');

    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.fuelMask = this.add.sprite(this.fuelBar.x, this.fuelBar.y, 'fuelBar');

    // ...it's not visible...
    this.fuelMask.visible = false;

    // and we assign it as energyBar's mask.
    this.fuelBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.fuelMask);

    this.timeEventFuel = this.time.addEvent({ delay: 1000, callback: this.timedEventFuel, callbackScope: this, loop: true });
  }

  setAmmo() {
    this.ammoContainer = this.add.sprite(1280, 720, 'ammoContainer');

    this.ammoBar = this.add.sprite(this.ammoContainer.x + 46, this.ammoContainer.y, 'ammoBar');

    this.ammoMask = this.add.sprite(this.ammoBar.x, this.ammoBar.y, 'ammoBar');

    this.ammoMask.visible = false;

    this.ammoBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.ammoMask);
  }

  setEarth() {
    // the energy container. A simple sprite
    this.earthContainer = this.add.sprite(1280, 720, 'earthContainer');

    // the energy bar. Another simple sprite
    this.earthBar = this.add.sprite(this.earthContainer.x + 46, this.earthContainer.y, 'earthBar');

    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.earthMask = this.add.sprite(this.earthBar.x, this.earthBar.y, 'earthBar');

    // ...it's not visible...
    this.earthMask.visible = false;

    // and we assign it as energyBar's mask.
    this.earthBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.earthMask);

    this.timeEventEarth = this.time.addEvent({ delay: 2500, callback: this.timedEventEarth, callbackScope: this, loop: true });
  }

  setMeteor() {
    this.meteorContainer = this.add.sprite(1280, 720, 'meteorContainer');

    this.meteorBar = this.add.sprite(this.meteorContainer.x + 46, this.meteorContainer.y, 'meteorBar');

    this.meteorMask = this.add.sprite(this.meteorBar.x, this.meteorBar.y, 'meteorBar');

    this.meteorMask.visible = false;

    this.meteorBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.meteorMask);
  }

  preload() {
    // On va venir charger toutes les images necessaires dans ce niveau
    this.load.image('Space', '../assets/gravityRush/level2/Space.png');
    this.load.image('Limit', '../assets/gravityRush/level2/Limit.png');
    this.load.image('Limit2', '../assets/gravityRush/level2/Limit2.png');
    this.load.image('Space1', '../assets/gravityRush/level2/Space1.png');
    this.load.image('Space0', '../assets/gravityRush/level2/Space0.png');
    this.load.image('SpaceFinal', '../assets/gravityRush/level2/SpaceFinal.png');
    this.load.image('Ground', '../assets/gravityRush/level2/Ground.png');
    this.load.image('Asteroids', '../assets/gravityRush/level2/Asteroids.png');
    this.load.image('Fuel', '../assets/gravityRush/level2/Fuel.png');
    this.load.image('Ammo', '../assets/gravityRush/level2/Ammo.png');
    this.load.image('fuelBar', '../assets/gravityRush/level2/fuelBar.png');
    this.load.image('fuelContainer', '../assets/gravityRush/level2/fuelContainer.png');
    this.load.image('ammoBar', '../assets/gravityRush/level2/ammoBar.png');
    this.load.image('ammoContainer', '../assets/gravityRush/level2/ammoContainer.png');
    this.load.image('earthBar', '../assets/gravityRush/level2/earthBar.png');
    this.load.image('earthContainer', '../assets/gravityRush/level2/earthContainer.png');
    this.load.image('meteorBar', '../assets/gravityRush/level2/meteorBar.png');
    this.load.image('meteorContainer', '../assets/gravityRush/level2/meteorContainer.png');
    this.load.image('Projectiles', '../assets/gravityRush/level2/Projectiles.png');
    this.load.spritesheet('Meteor', '../assets/gravityRush/level2/Meteor.png', { frameWidth: 757.91, frameHeight: 800 });
    this.load.spritesheet('SpaceShip', '../assets/gravityRush/level2/Spritesheet.png', { frameWidth: 165.16, frameHeight: 110 });
  }

  update() {

    if (this.cursors.down.isDown) {
      this.spaceship.setVelocityY(250);

      if (this.cursors.right.isDown) {
        this.spaceship.setVelocityX(250);
        this.spaceship.anims.play('downRight', true);
      } else if (this.cursors.left.isDown) {
        this.spaceship.setVelocityX(-250);
        this.spaceship.anims.play('downLeft', true);
      } else {
        this.spaceship.setVelocityX(0);
        this.spaceship.anims.play('downRight', true);
      }
    } else if (this.cursors.up.isDown) {
      this.spaceship.setVelocityY(-250);

      if (this.cursors.right.isDown) {
        this.spaceship.setVelocityX(250);
        this.spaceship.anims.play('upRight', true);
      } else if (this.cursors.left.isDown) {
        this.spaceship.setVelocityX(-250);
        this.spaceship.anims.play('upLeft', true);
      } else {
        this.spaceship.setVelocityX(0);
        this.spaceship.anims.play('upRight', true);
      }
    } else if (this.cursors.left.isDown) {
      this.spaceship.setVelocityY(0);
      this.spaceship.setVelocityX(-250);

      this.spaceship.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.spaceship.setVelocityY(0);
      this.spaceship.setVelocityX(250);

      this.spaceship.anims.play('right', true);
    } else {
      this.spaceship.setVelocityY(0);
      this.spaceship.setVelocityX(0);

      this.spaceship.anims.play('right', true);
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

    if (this.lifeMeteor < 100) {
      this.meteor.anims.play('run', true);
    } else {
      this.meteor.anims.play('explode', true);
    }

    if (this.lifeMeteor >= 100) {
      this.win = true;
    }

    if (this.nbFuel === 100 || this.lifeEarth === 100) {
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
      console.log('Vous êtes morts, en plus de ça vous êtes nuls nuls nuls');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/gravityRush']));
    }

    if (this.win) {
      this.score = 10000 + (100 - this.nbFuel) * 23000 + (100 - this.nbAmmo) * 13000 - (this.time * 5000);
      // tslint:disable-next-line:max-line-length
      console.log('Bravo vous avez réussi à détruire la météorite, vous avez sauvé des milliards de vies humaines c\'est cool ça');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/taches/list']));
    }
  }

  setCoordBars() {

    const cam = this.cameras.main;

    this.fuelContainer.x = cam.midPoint.x - 460;
    this.fuelBar.x = cam.midPoint.x - 460 + 25;
    this.fuelMask.x = cam.midPoint.x - 460 + 25 - (this.fuelMask.displayWidth / 100) * this.nbFuel;

    this.fuelContainer.y = cam.midPoint.y - 320;
    this.fuelBar.y = cam.midPoint.y - 320;
    this.fuelMask.y = cam.midPoint.y - 320;

    this.ammoContainer.x = cam.midPoint.x - 460;
    this.ammoBar.x = cam.midPoint.x - 460 + 25;
    this.ammoMask.x = cam.midPoint.x - 460 + 25 - (this.ammoMask.displayWidth / 100) * this.nbAmmo;

    this.ammoContainer.y = cam.midPoint.y - 270;
    this.ammoBar.y = cam.midPoint.y - 270;
    this.ammoMask.y = cam.midPoint.y - 270;

    if (this.meteorAlive === true) {

      this.earthContainer.x = cam.midPoint.x - (- 460);
      this.earthBar.x = cam.midPoint.x - (- 460) - 25;
      this.earthMask.x = cam.midPoint.x - (- 460) - 25 - (this.earthMask.displayWidth / 100) * this.lifeEarth;

      this.earthContainer.y = cam.midPoint.y - 270;
      this.earthBar.y = cam.midPoint.y - 270;
      this.earthMask.y = cam.midPoint.y - 270;
    }

    this.meteorContainer.x = cam.midPoint.x - (- 460);
    this.meteorBar.x = cam.midPoint.x - (- 460) - 25;
    this.meteorMask.x = cam.midPoint.x - (- 460) - 25 - (this.meteorMask.displayWidth / 100) * this.lifeMeteor;

    this.meteorContainer.y = cam.midPoint.y - 320;
    this.meteorBar.y = cam.midPoint.y - 320;
    this.meteorMask.y = cam.midPoint.y - 320;
  }

  collectFuel(spaceship, fuel) {
    fuel.disableBody(true, true);

    this.nbFuel = 0;
  }

  collectAmmo(spaceship, ammo) {
    ammo.disableBody(true, true);

    if (this.nbAmmo > 0) {
      this.nbAmmo -= 15;
    }
    if (this.nbAmmo < 0) {
      this.nbAmmo = 0;
    }
  }
}
