import exp from 'constants';
import TerrorAttack from '../models/attackModel';
import e from 'express';
export const fetchDeadliestAttackTypes = async (): Promise<{ attackType: string; totalCasualties: number }[]> => 
    TerrorAttack.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          totalCasualties: { $sum: { $add: ["$nkill", "$nwound"] } }
        }
      },
      { $sort: { totalCasualties: -1 } },
      { $project: { _id: 0, attackType: "$_id", totalCasualties:1}}
]);

export const fetchAverageCasualties = async (region: string): Promise<{ region: string; averageCasualties: number; center: { latitude: number; longitude: number } }[]> => 
  TerrorAttack.aggregate([
    {
      $group: {
        _id: `$${region}`,
        totalCasualties: { $sum: { $add: ["$nkill", "$nwound"] } },
        totalEvents: { $sum: 1 },
        avgLatitude: { $avg: "$latitude" },
        avgLongitude: { $avg: "$longitude" }
      }
    },
    {
      $addFields: {
        averageCasualties: { $divide: ["$totalCasualties", "$totalEvents"] },
        location: { latitude: "$avgLatitude", longitude: "$avgLongitude" }
      }
    },
    { $sort: { averageCasualties: -1 } },
    { $project: { _id: 0, region: "$_id", averageCasualties: 1, location: 1 } },
    { $limit: 1 }
  ]);

  export const fetchAttacksByYears = async (
    year?: string,
    fromYear?: string,
    toYear?: string,
    lastYears?: string
  ): Promise<{ month: number; year: number; totalAttacks: number }[]> => {
    if (year) {
      const result = await TerrorAttack.aggregate([
        { $match: { iyear: parseInt(year) } },
        {
          $group: {
            _id: { month: "$imonth", year: "$iyear" },
            totalAttacks: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalAttacks: 1,
          },
        },
        { $sort: { year: 1, month: 1 } },
      ]);
      return result;
    }
  
    if (fromYear && toYear) {
      const result = await TerrorAttack.aggregate([
        { $match: { iyear: { $gte: parseInt(fromYear), $lte: parseInt(toYear) } } },
        {
          $group: {
            _id: { month: "$imonth", year: "$iyear" },
            totalAttacks: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalAttacks: 1,
          },
        },
        { $sort: { year: 1, month: 1 } },
      ]);
      return result;
    }
  
    if (lastYears) {
      const result = await TerrorAttack.aggregate([
        { $match: { iyear: { $gte: new Date().getFullYear() - parseInt(lastYears) } } },
        {
          $group: {
            _id: { month: "$imonth", year: "$iyear" },
            totalAttacks: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalAttacks: 1,
          },
        },
        { $sort: { year: 1, month: 1 } }, 
      ]);
      return result;
    }
  
    throw new Error("No valid parameters provided");
  };
  
  


  export const fetchTopGroups = async (region: string, top5?: string): Promise<{ group: string; totalAttacks: number }[]> => {
    const pipeline: any[] = [
      { $match: { region_txt: region } },
      {
        $group: {
          _id: "$gname",
          totalAttacks: { $sum: 1 },
          averageLatitude: { $avg: "$latitude" },
          averageLongitude: { $avg: "$longitude" }
        }
      },
      { $sort: { totalAttacks: -1 } },
      {
        $project: {
          _id: 0,
          group: "$_id",
          totalAttacks: 1,
          location: {
            latitude: "$averageLatitude",
            longitude: "$averageLongitude"
          }
        }
      }
    ];

    if (top5) {
      pipeline.push({ $limit: 5 });
    }
  
    return TerrorAttack.aggregate(pipeline);
  };
  

  export const fetchGroupsByYear = async (year: string, group_name?: string): Promise<{ group: string; totalAttacks: number }[] | object[]> => {
    if (group_name) {
      return await TerrorAttack.aggregate([
        { $match: { gname: group_name } }, 
        { $group: { _id: { year: "$iyear" }, totalAttacks: { $sum: 1 } } },
        { $sort: { "_id.year": 1 } },
        { $project: { _id: 0, year: "$_id.year", totalAttacks: 1 } } 
      ]);
    }
  
    return await TerrorAttack.aggregate([
      { $match: { iyear: parseInt(year) } },
      {
        $group: {
          _id: "$gname",
          totalAttacks: { $sum: 1 },
        },
      },
      { $sort: { totalAttacks: -1 } },
      { $project: { _id: 0, group: "$_id", totalAttacks: 1 } },
    ]);
  };
  ;

export const fetchDeadliestRegionsByGroup = async (group: string): Promise<{ region: string; totalAttacks: number; }[]> =>
  TerrorAttack.aggregate([
    { $match: { gname: group } },
    {
      $group: {
        _id: "$region_txt",
        totalAttacks: { $sum: 1 },
        totalCasualties: { $sum: { $add: ["$nkill", "$nwound"] } },
        avgLatitude: { $avg: "$latitude" },
        avgLongitude: { $avg: "$longitude" }
      }
    },
    { $sort: { totalAttacks: -1 } },
    { $project: { _id: 0, region: "$_id", totalAttacks: 1, totalCasualties: 1, location: { latitude: "$avgLatitude", longitude: "$avgLongitude" } } }
  ]);