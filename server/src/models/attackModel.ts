import mongoose, { Schema, Document } from 'mongoose';

export interface ITerrorAttack extends Document {
    eventid: number,
    iyear: number,
    imonth: number,
    iday: number,
    country_txt: string,
    region_txt: string,
    city: string,
    latitude?: number,
    longitude?: number,
    attacktype1_txt: string,
    targtype1_txt: string,
    target1: string,
    gname: string,
    weaptype1_txt: string,
    nkill?: number,
    nwound?: number,

}

const TerrorAttackSchema: Schema = new Schema({
    eventid: { type: Number, required: true },
    iyear: { type: Number, required: true },
    imonth: { type: Number, required: true },
    iday: { type: Number, required: true },
    country_txt: { type: String, required: true },
    region_txt: { type: String, required: true },
    city: { type: String, default: 'Unknown' },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    attacktype1_txt: { type: String, required: true },
    targtype1_txt: { type: String, required: true },
    target1: { type: String, default: 'Unknown'  },
    gname: { type: String, required: true },
    weaptype1_txt: { type: String, required: true },
    nkill: { type: Number, default: 0 },
    nwound: { type: Number, default: 0 },
  });
  
  
  const TerrorAttack = mongoose.model<ITerrorAttack>("TerrorAttack", TerrorAttackSchema);
  
  export default TerrorAttack;