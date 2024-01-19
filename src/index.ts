import { PlayableCharacter, NonPlayableCharacter } from "./Characters";
import { CharacterInteractionsService } from "./CharacterInteractionsService";

const characterInteractor = new CharacterInteractionsService();

const humanMage = new PlayableCharacter({
  name: "OGGandalf",
  race: "human",
  armorValue: 10,
  classSelection: "mage",
  faction: "alliance",
  hitPoints: 100,
  gold: 500,
  characterInteractionsService: characterInteractor,
});

const humanWarrior = new PlayableCharacter({
  name: "BestWarrior",
  race: "human",
  armorValue: 40,
  classSelection: "warrior",
  faction: "alliance",
  hitPoints: 100,
  gold: 200,
  characterInteractionsService: characterInteractor,
});

const orcWarrior = new PlayableCharacter({
  name: "Zugzug",
  race: "orc",
  armorValue: 40,
  classSelection: "warrior",
  faction: "horde",
  hitPoints: 100,
  gold: 200,
  characterInteractionsService: characterInteractor,
});

const nonFriendlyHumanThiefNPC = new NonPlayableCharacter({
  name: "Human thief",
  race: "human",
  friendlyTo: [],
  armorValue: 20,
  hitPoints: 100,
  characterInteractionsService: characterInteractor,
});

// try {
//   orcWarrior.tradeGold(humanMage, 100);
// } catch (error: any) {
//   console.log(error.message);
// }

//duelo a muerte entre 2 miembros de la facción opuesta
// try {
//   orcWarrior.attackCharacter(humanMage, 20);
//   console.log("HP del mago: ", humanMage.hitPoints);

//   orcWarrior.attackCharacter(humanMage, 80);
//   console.log("HP del mago: ", humanMage.hitPoints);

//   orcWarrior.attackCharacter(humanMage, 30);
//   console.log("HP del mago: ", humanMage.hitPoints);

//   orcWarrior.attackCharacter(humanMage, 30);
//   console.log("HP del mago: ", humanMage.hitPoints);
// } catch (error: any) {
//   console.log(error.message);
// }

//Trading de oro entre 2 miembros de la misma facción
try {
  humanWarrior.tradeGold(humanMage, 100);
  console.log("oro de humanWarrior: ", humanWarrior.gold);
  console.log("oro de humanMage: ", humanMage.gold);
} catch (error: any) {
  console.log(error.message);
}

try {
  humanWarrior.tradeGold(humanMage, 300);
  console.log("oro de humanWarrior: ", humanWarrior.gold);
  console.log("oro de humanMage: ", humanMage.gold);
} catch (error: any) {
  console.log(error.message);
}
