import { CharacterInteractions, PlayableCharacterInteractions } from "./CharacterInteractionsService";

type Faction = "alliance" | "horde";
type Race = "human" | "orc";
type ClassSelection = "warrior" | "mage";

export abstract class Character {
  name: string;
  hitPoints: number;
  race: Race;
  armorValue: number;

  constructor(params: {
    name: string;
    hitPoints: number;
    race: Race;
    armorValue: number;
  }) {
    this.name = params.name;
    this.hitPoints = params.hitPoints;
    this.race = params.race;
    this.armorValue = params.armorValue;
  }

  updateHitpoints(updatedHitpoints: number) {
    this.hitPoints = updatedHitpoints;
  }

  abstract attackCharacter(character: Character, damage: number): void;
}

export class NonPlayableCharacter extends Character {
  friendlyTo: Faction[];
  characterInteractionsService: CharacterInteractions;

  constructor(params: {
    name: string;
    hitPoints: number;
    race: Race;
    friendlyTo: Faction[];
    armorValue: number;
    characterInteractionsService: CharacterInteractions;
  }) {
    super({
      name: params.name,
      hitPoints: params.hitPoints,
      race: params.race,
      armorValue: params.armorValue,
    });

    this.friendlyTo = params.friendlyTo;
    this.characterInteractionsService = params.characterInteractionsService;
  }

  attackCharacter(character: Character, damage: number): void {
    this.characterInteractionsService.attackCharacter(this, character, damage);
  }
}

export class PlayableCharacter extends Character {
  faction: Faction;
  classSelection: ClassSelection;
  gold: number;

  characterInteractionsService: CharacterInteractions &
    PlayableCharacterInteractions;

  constructor(params: {
    name: string;
    faction: Faction;
    hitPoints: number;
    race: Race;
    classSelection: ClassSelection;
    armorValue: number;
    gold: number;
    characterInteractionsService: CharacterInteractions &
      PlayableCharacterInteractions;
  }) {
    super({
      name: params.name,
      hitPoints: params.hitPoints,
      race: params.race,
      armorValue: params.armorValue,
    });
    this.faction = params.faction;
    this.classSelection = params.classSelection;
    this.gold = params.gold;
    this.characterInteractionsService = params.characterInteractionsService;
  }

  attackCharacter(character: Character, damage: number): void {
    this.characterInteractionsService.attackCharacter(this, character, damage);
  }

  tradeGold(tradeTo: PlayableCharacter, goldToTrade: number) {
    this.characterInteractionsService.transferGold(this, tradeTo, goldToTrade);
  }

  updateGold(updatedGold: number) {
    this.gold = updatedGold;
  }
}

