export interface IHash {
  password: string;
  saltOrRound?: number;
}

export interface ICompare {
  hashedPassword: string;
  password: string;
}
