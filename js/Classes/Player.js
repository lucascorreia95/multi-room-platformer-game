class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations }) {
    super({ imageSrc, frameRate, animations });

    this.position = {
      x: 200,
      y: 200,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;
    this.collisionBlocks = collisionBlocks;
  };

  checkHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
        this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x;

          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        };

        if (this.velocity.x > 0) {
          const offset = this.hitBox.position.x - this.position.x + this.hitBox.width;

          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        };
      };
    };
  };

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  };

  checkVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
        this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          const offset = this.hitBox.position.y - this.position.y;

          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        };

        if (this.velocity.y > 0) {
          const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;

          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        };
      };
    };
  };

  update() {
    this.position.x += this.velocity.x;

    this.updateHitBox();
    this.checkHorizontalCollisions();
    this.applyGravity();
    this.updateHitBox();
    this.checkVerticalCollisions();
  };

  updateHitBox() {
    this.hitBox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  };

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
  }
};