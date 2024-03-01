import * as readline from 'readline-sync';
import * as fs from 'fs';
import { Character, OtherObject } from './interfaces';

function readJSONFile(filePath: string): any {
  const jsonString = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonString);
}

function viewAllData(characters: Character[]): void {
  characters.forEach((character: Character) => {
    console.log(`${character.name} (${character.id})`);
  });
}

function filterByID(characters: Character[], id: number): Character | null {
  return characters.find((character: Character) => character.id === id) || null;
}

function main(): void {
  const characters: Character[] = readJSONFile('champions.json');
  const otherObjects: OtherObject[] = readJSONFile('abilities.json');

  console.log('Welcome to the JSON data viewer!\n');

  let choice: number = 0;
  while (choice !== 3) {
    console.log('1. View all data');
    console.log('2. Filter by ID');
    console.log('3. Exit\n');

    const userInput: string | null = readline.question('Please enter your choice: ');
  if (userInput === null) {
    console.log('\nInvalid input. Please enter a valid option.\n');
    continue;
  }

  choice = parseInt(userInput, 10);

    switch (choice) {
      case 1:
        console.log('\n- All Characters -');
        viewAllData(characters);
        console.log();
        break;
      case 2:
        const userInput: string | null = readline.question('Please enter the ID you want to filter by: ');
        if (userInput === null) {
                console.log('\nInvalid input. Please enter a valid ID.\n');
                break;
            }
         const id = parseInt(userInput, 10);
        const character = filterByID(characters, id);
        if (character) {
          console.log(`\n- ${character.name} (${character.id}) -`);
          console.log(`- Description: ${character.description}`);
          console.log(`- Age: ${character.age}`);
          console.log(`- Active: ${character.active}`);
          console.log(`- Birthdate: ${character.birthdate}`);
          console.log(`- Image: ${character.imageUrl}`);
          console.log(`- Role: ${character.role}`);
          console.log(`- Hobbies: ${character.hobbies.join(', ')}`);
          console.log(`- Other Object ID: ${character.otherObject.id}`);
          const otherObject = otherObjects.find((obj) => obj.id === character.otherObject.id);
          if (otherObject) {
            console.log(`- Ability: ${otherObject.ability}`);
            console.log(`- Damage: ${otherObject.damage}`);
            console.log(`- Cooldown: ${otherObject.cooldown}`);
            console.log(`- Range: ${otherObject.range}`);
          } else {
            console.log('- Other Object data not found.');
          }
          console.log();
        } else {
          console.log('\nCharacter with the specified ID not found.\n');
        }
        break;
      case 3:
        console.log('\nExiting...');
        break;
      default:
        console.log('\nInvalid choice. Please enter a valid option.\n');
        break;
    }
  }
}

main();
