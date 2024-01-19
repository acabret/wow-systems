import { Character, NonPlayableCharacter, PlayableCharacter } from "./Characters";

export interface CharacterInteractions {
    attackCharacter(attacker: Character, target: Character, damage: number): void;
  }
  
  export interface PlayableCharacterInteractions {
    transferGold(
      tradeFrom: PlayableCharacter,
      tradeTo: PlayableCharacter,
      goldAmountToTransfer: number
    ): void;
  }
  
  export class CharacterInteractionsService
    implements CharacterInteractions, PlayableCharacterInteractions
  {
    attackCharacter(attacker: Character, target: Character, damage: number) {
      if (
        attacker instanceof PlayableCharacter &&
        target instanceof PlayableCharacter &&
        attacker.faction === target.faction
      )
        throw new Error("Can't attack player from the same faction.");
  
      if (
        (attacker instanceof PlayableCharacter &&
          target instanceof NonPlayableCharacter &&
          target.friendlyTo.some((isFriendlyToFaction) => attacker.faction)) ||
        (attacker instanceof NonPlayableCharacter &&
          target instanceof PlayableCharacter &&
          attacker.friendlyTo.some((isFriendlyToFaction) => target.faction))
      )
        throw new Error("Can't attack a friendly target.");
  
      if (target.hitPoints <= 0) throw new Error("Can't attack a dead target.");
  
      const healthCalculation =
        target.hitPoints - (damage - damage * (target.armorValue / 100));
  
      if (healthCalculation < 0) target.updateHitpoints(0);
      else target.updateHitpoints(healthCalculation);
    }
  
    transferGold(
      tradeFrom: PlayableCharacter,
      tradeTo: PlayableCharacter,
      goldAmountToTransfer: number
    ) {
      if (tradeFrom.faction !== tradeTo.faction)
        throw new Error("Players must be from the same faction.");
      if (goldAmountToTransfer <= 0)
        throw new Error("You need to transfer at least 1 gold.");
      if (tradeFrom.gold - goldAmountToTransfer < 0)
        throw new Error("Player does not have enough gold to trade.");
  
      tradeFrom.updateGold(tradeFrom.gold - goldAmountToTransfer);
      tradeTo.updateGold(tradeTo.gold + goldAmountToTransfer);
    }
  }