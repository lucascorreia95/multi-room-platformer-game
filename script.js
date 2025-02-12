const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

const parsedCollisions = collisionLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D(CollisionBlock);

const backgroundLevel1 = new Sprite({
  imageSrc: './img/backgroundLevel1.png',
  position: {
    x: 0,
    y: 0,
  }
});

const player = new Player({
  collisionBlocks,
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/king/idle.png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/king/idleLeft.png',
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 16,
      loop: true,
      imageSrc: './img/king/runRight.png',
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 16,
      loop: true,
      imageSrc: './img/king/runLeft.png',
    },
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  backgroundLevel1.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });

  player.velocity.x = 0;

  if (keys.d.pressed) {
    player.switchSprite('runRight');
    player.velocity.x = 2;
    player.lastDirection = 'right';
  } else if (keys.a.pressed) {
    player.switchSprite('runLeft');
    player.velocity.x = -2;
    player.lastDirection = 'left';
  } else {
    if (player.lastDirection === 'left') {
      player.switchSprite('idleLeft');
    } else {
      player.switchSprite('idleRight');
    };
  };

  player.draw();
  player.update();
}

animate();