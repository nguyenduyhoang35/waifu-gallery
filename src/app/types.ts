export interface IData {
  _id:      string;
  name:     string;
  url:      string;
  imgSmall: string;
  img:      string;
  bio:      string;
  type:     string;
  role:     string;
  position: string;
  profile:  Profile;
  skills:   Skill[];
  weapon:   Weapon;
  __v:      number;
}

export interface Profile {
  familyName: string;
  age:        string;
  height:     string;
  hobby:      string;
  school:     string;
  club:       string;
  weaponName: string;
  weaponType: string;
  CV:         string;
}

export interface Skill {
  name:        string;
  type:        string;
  description: string;
  parameters:  Array<string[]>;
  cost?:       number[];
  img:         string;
}

export interface Weapon {
  name:      string;
  img:       string;
  desc:      string;
  type:      string;
  attack:    number;
  attackAdd: number;
  hp:        number;
  hpAdd:     number;
  heal:      number;
  healAdd:   number;
}