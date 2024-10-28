import { DIRECTIONS, IMAGEASSETS } from '@/types/game';
import Phaser from 'phaser';

export default class MyPhaserScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: any

  constructor() {
    super({ key: 'MyPhaserScene' });
  }

  preload() {
    
    this.load.image(IMAGEASSETS.MAP.KEY, IMAGEASSETS.MAP.PATH);
    this.load.spritesheet(IMAGEASSETS.PLAYER_SPRTE.KEY, IMAGEASSETS.PLAYER_SPRTE.PATH, {
      frameWidth: 32,
      frameHeight: 64
    });

  }

  create() {

    const { width, height } = this.scale;
    const mapImage = this.add.image(width / 2, height / 2, IMAGEASSETS.MAP.KEY);

    const staticGroup = this.physics.add.staticGroup();
    staticGroup.add(mapImage);

    this.player = this.physics.add.sprite(width/2, height/2, IMAGEASSETS.PLAYER_SPRTE.KEY);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, staticGroup);

    this.anims.create({
      key: DIRECTIONS.DOWN,
      frames: this.anims.generateFrameNumbers(IMAGEASSETS.PLAYER_SPRTE.KEY, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: DIRECTIONS.LEFT,
      frames: this.anims.generateFrameNumbers(IMAGEASSETS.PLAYER_SPRTE.KEY, {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: DIRECTIONS.UP,
      frames: this.anims.generateFrameNumbers(IMAGEASSETS.PLAYER_SPRTE.KEY, {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: DIRECTIONS.RIGHT,
      frames: this.anims.generateFrameNumbers(IMAGEASSETS.PLAYER_SPRTE.KEY, {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "x",
      frames: this.anims.generateFrameNumbers(IMAGEASSETS.PLAYER_SPRTE.KEY, {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys()
    }
    
  }

  update() {
    this.player.setVelocity(0);

    // Check for movement and set velocity
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play(DIRECTIONS.LEFT, true); // Play left animation
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play(DIRECTIONS.RIGHT, true); // Play right animation
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play(DIRECTIONS.UP, true); // Play up animation
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play(DIRECTIONS.DOWN, true); // Play down animation
    } else {
      this.player.anims.play('idle', true);
      this.player.anims.stop(); // Set to idle animation if no key is pressed
    }

  }
}
