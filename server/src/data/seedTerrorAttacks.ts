import fs from 'fs';
import path from 'path';
import TerrorAttack from '../models/attackModel';


export const terrorAttacksSeed = async () => {
  const existingDataCount = await TerrorAttack.countDocuments();

  if (existingDataCount > 0) {
    console.log('Data already exists, skipping seeding.');
    return;
  }

  try {

    const filePath = path.resolve(__dirname, './data.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const terrorAttacks = JSON.parse(data);

    await TerrorAttack.insertMany(terrorAttacks);
    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export default terrorAttacksSeed;
