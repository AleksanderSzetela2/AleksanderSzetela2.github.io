let player
let q = 0
let arena
let bulletSpeed = 2
let xbullets = []
let ybullets = []
let bulletQuantity = 4500
let t = 0
let gameState = "title"

function preload() {
}

function setup() {
  createCanvas(1440, 789)

  player = new Player()
  arena = new Arena()

    for (let i = 0; i < bulletQuantity; i++)
    {
      xbullets[i] = {
      x: random(-25, -100000),
      y: random(51, 738),
      h: 25,
      w: 12.5
      };
    }

    for (let i = 0; i < bulletQuantity; i++)
    {
      ybullets[i] = {
      x: random(375.5, 1064.5),
      y: random(-25, -100000),
      h: 12.5,
      w: 25
      };
    }
  }

function draw() {
  background(0)

  for (let xbullet of xbullets)
  {

    if (collision(xbullet))
    {
      gameState = "dead"
    }
  }

  for (let ybullet of ybullets)
  {
    if (collision(ybullet))
    {
      gameState = "dead"
    }
}

if (gameState == "title")
{
  title()
}


if (gameState == "start")
{
  start()
  arena.display()
  player.display()
}

  if (gameState == "play")
  {
    arena.display()
    player.display()
    t++
    if (t >= (6063870 / bulletSpeed))
    {
      gameState = "win"
    }


    player.move()

    for (let i = 0; i < bulletQuantity; i++)
    {
      fill(255, 0, 0)
      rect(xbullets[i].x, xbullets[i].y, xbullets[i].h, xbullets[i].w);

      xbullets[i].x = xbullets[i].x + bulletSpeed;
    }

    for (let i = 0; i < bulletQuantity; i++)
    {
      fill(255, 0, 0)
      rect(ybullets[i].x, ybullets[i].y, ybullets[i].h, ybullets[i].w);

      ybullets[i].y = ybullets[i].y + bulletSpeed;
    }
  }
    if (gameState == "dead")
    {
      arena.display()
      player.display()
      death()
    }

    if (gameState == "win")
    {
      arena.display()
      player.display()
      victory()
    }
}

class Player {
  constructor() {
    this.x = width / 2
    this.y = height / 2
    this.w = 20
    this.h = 20
  }

  display() {
    fill(255)
    noStroke()
    rect(this.x, this.y, this.w, this.h)
    stroke(0, 0, 0)
    strokeWeight(0)
  }

  move() {
    if (keyIsDown(87)) {
      this.y = this.y - 5
      if (keyIsDown(82))
      {
        this.y = this.y + 4
      }
    }

    if (this.y <= 50)
    {
      this.y = 51
    }

    if (keyIsDown(65)) {
      this.x = this.x - 5
      if (keyIsDown(82))
      {
        this.x = this.x + 4
      }
    }

    if (this.x <= 375.5)
    {
      this.x = 376.5
    }

    if (keyIsDown(83)) {
      this.y = this.y + 5
      if (keyIsDown(82))
      {
        this.y = this.y - 4
      }
    }

    if (this.y >= 719)
    {
      this.y = 738 - 20
    }

    if (keyIsDown(68)) {
      this.x = this.x + 5
      if (keyIsDown(82))
      {
        this.x = this.x - 4
      }
    }

    if (this.x >= 1044.5)
    {
      this.x = 1044.5
    }
  }
}

class Arena {

  constructor() {
    this.x = 375.5
    this.y = 50
    this.w = 689
    this.h = 689

  }
  display() {
    fill(0)
    stroke(150, 0, 0)
    strokeWeight(5)
    rect(this.x, this.y, this.w, this.h)
  }
}

function title() {
  fill(255, 0, 0)
  textAlign(CENTER)
  noStroke()
  textSize(50)
  text("Just dodge it's not that hard", width / 2, 75)
  text("Use WASD to move", width / 2, 200)
  text("Hold R for smaller movements", width / 2, 300)
  text("Press ENTER to begin", width / 2, height / 2)

}

function start() {
  fill(150, 0, 0)
  textAlign(CENTER)
  noStroke()
  textSize(35)
  text("Press ENTER to Begin", width / 2, 35)
}

function death() {
  fill(150, 0, 0)
  textAlign(CENTER)
  noStroke()
  textSize(35)
  text("You DIED", width / 2, 35)
  text("Reload Page to Play Again", width / 2, 100)
}

function victory() {
  fill(150, 0, 0)
  textAlign(CENTER)
  noStroke()
  textSize(35)
  text("You Win! I didn't expect that tbh.", width / 2, 35)
  text("Reload Page to Play Again", width / 2, 100)
}

function keyPressed() {
  if(keyPressed == "ENTER" || keyCode == RETURN)
  {
    if (gameState == "title")
    {
      gameState = "start"
    }
    if(gameState == "start")
    {
      gameState = "play"
    }
  }
}

function collision(bullet) {
  if (player.x - player.w / 2 > bullet.x + bullet.w / 2 || bullet.x - bullet.w / 2 > player.x + player.w / 2)
  {
    return false;
  }

  if (player.y - player.h / 2 > bullet.y + bullet.h / 2 || bullet.y - bullet.h / 2 > player.y + player.h / 2)
  {
    return false;
  }

  if (player.x - player.w / 2 > bullet.x + bullet.w / 2 || bullet.x - bullet.w / 2 > player.x + player.w / 2)
  {
    return false;
  }

  if(player.y - player.h / 2 > bullet.y + bullet.h / 2 || bullet.y - bullet.h / 2 > player.y + player.h / 2)
  {
    return false;
  }

  return true;
}