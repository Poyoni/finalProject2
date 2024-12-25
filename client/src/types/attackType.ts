export interface ITerrorAttackStats {
    eventid: number,
    iyear: number,
    imonth: number,
    iday: number,
    country_txt: string,
    region_txt: string,
    city: string,
    latitude: number,
    longitude: number,
    attacktype1_txt: string,
    targtype1_txt: string,
    target1: string,
    gname: string,
    weaptype1_txt: string,
    nkill?: number,
    nwound?: number,
}

interface Location {
    latitude: number;
    longitude: number;
}
//בקשה 1
export interface IAttackTypeStats {
    attackType: string;
    totalCasualties: number;
  }

//בקשה 2 - מפה
export interface IDeadliestAttacksStats {
    averageCasualties: number;
    location: Location;
    region: string;
  }

// בקשה 3 - גרף
export interface IYearStats {
  totalAttacks: number;
  month: number;
  year: number;
  }

//בקשה 4 - מפה
export interface IAttackGroupStats {
    group: string;
    location: Location;
    totalAttacks: number;
  }
  
//בקשה 5 - גרף
export interface IGroupStats {
    totalAttacks: number;
    group: string;
  }
//בקשה 6 - מפה
  export  interface IDeadliestRegionStats {
    location: Location;
    region: string;
    totalAttacks: number;
    totalCasualties: number;
  }