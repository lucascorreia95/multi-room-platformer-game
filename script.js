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
    enterDoor: {
      frameRate: 8,
      frameBuffer: 16,
      loop: false,
      imageSrc: './img/king/enterDoor.png',
    },
  },
});

const doors = [
  new Sprite({
    position: {
      x: 767,
      y: 270,
    },
    imageSrc: './img/doorOpen.png',
    frameRate: 5,
    frameBuffer: 16,
    loop: false,
    autoPlay: false,
  }),
];

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
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();
};

animate();