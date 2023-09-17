let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");
const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 15,
  },
  {
    name: "sword",
    power: 100,
  },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 10,
  },
  {
    name: "fanged beast",
    level: 5,
    health: 20,
  },
  {
    name: "dragon",
    level: 100,
    health: 100,
  },
];

const locations = [
  {
    name: "Town Square",
    "button text": ["Go to Store", "Go to cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says " Store ".',
  },
  {
    name: "Store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go back To Town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You are in the store. What do you want to do?",
  },
  {
    name: "Cave",
    "button text": ["Fight Slime", "fight fanged beast", "Go back to town"],
    "button functions": [fightSlime, fightFangedBeast, goTown],
    text: "You are in the cave. You see some monsters",
  },
  {
    name: "Fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster",
  },
  {
    name: "kill monster",
    "button text": ["Go back to town square", "Go to store", "Go to cave"],
    "button functions": [goTown, goStore, easterEgg],
    text: "The monster screams in pain and dies. You are victorious!",
  },
  {
    name: "lose",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You died. Game over.",
  },
  {
    name: "win",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the Dragon! You Gain Title Dragon Slayer .",
  },
  {
    name: "easter Egg",
    "button text": ["2", "8", "Go to Town Square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secrete game. Pick a number above. Ten numbers will be randomly chosen. If you pick the right number you win.",
  },
];
//initizalize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You don't have enough gold";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You bought a " + newWeapon + "!";
      inventory.push(newWeapon);
      text.innerText += "In your inventory you have: " + inventory;
    } else {
      text.innerText = "You don't have enough gold";
    }
  } else {
    text.innerText = "You already have the best weapon!";
    button2.innerText = "sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold your " + currentWeapon + "!";
    text.innerText += "In your inventory you have: " + inventory;
  } else {
    text.innerText = "You can't sell your last weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightFangedBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks you!";
  text.innerText +=
    "You attack the monster with your " + weapons[currentWeapon].name + "!";
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += "You Miss";
  }
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " broke!";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  let hit = level * 5 - Math.floor(Math.random() * xp);
  return hit;
}
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[fighting].name + "!";
}

function defeatMonster() {
  text.innerText = "You defeated the " + monsters[fighting].name + "!";
  xp += monsters[fighting].level;
  gold += Math.floor(monsters[fighting].level * 6.7);
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(location[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  fighting;
  monsterHealth;
  inventory = ["stick"];
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}

function pick(guess){
    let numbers = [];
    while (numbers.length < 10) {
        let number = Math.floor(Math.random() * 11);
        numbers.push(number);
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n" ;

    for (let i = 0; i < 10 ; i++)
    {
       text.innerText += numbers[i] + "\n";
    }
    if (numbers.indexOf(guess)!== -1){
        text.innerText += "You win! You get 100 gold!";
        gold += 100;
        goldText.innerText = gold;
    }else{
        text.innerText += "You lose 10 health!";
        health -= 10;
        if (health <= 0){
            lose();
        }
    }
}