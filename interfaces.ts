
export interface OtherObject {
    id: number;
    ability: string;
    damage: number;
    cooldown: number;
    range: number;
  }
  

export interface Character {
    id: number;
    name: string;
    description: string;
    age: number;
    active: boolean;
    birthdate: string;
    imageUrl: string;
    role: string;
    hobbies: string[];
    otherObject: OtherObject;
  }
  