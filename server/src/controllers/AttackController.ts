import { Request, Response } from 'express';
import { fetchDeadliestAttackTypes, fetchAverageCasualties, fetchAttacksByYears, fetchTopGroups, fetchGroupsByYear, fetchDeadliestRegionsByGroup } from '../services/attacksDataServices';

export const getDeadliestAttacks = async (req: Request, res: Response) => {
    try {
        const AttacksByType = await fetchDeadliestAttackTypes()
        res.status(200).json(AttacksByType);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getHighestCasualtyRegions = async (req: Request, res: Response) => {
    const { region } = req.query
    try {
        const AverageCasualties = await fetchAverageCasualties(region as string)
        res.status(200).json(AverageCasualties);
    }catch (error) {
        res.status(500).json(error);
    }
}

export const getIncidentTrends = async (req: Request, res: Response) => {
    const { year, fromYear, toYear, lastYears } = req.query 
    try {
        const sumOfAttacksByYears = await fetchAttacksByYears(year as string, fromYear as string, toYear as string, lastYears as string)
        res.status(200).json(sumOfAttacksByYears);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTopGroups = async (req: Request, res: Response) => {
    const { region,top5 } = req.query
    try {
        const TopGroups = await fetchTopGroups(region as string, top5 as string)
        res.status(200).json(TopGroups);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getGroupsByYear = async (req: Request, res: Response) => {
    const { year, group_name } = req.query
    try {
        const GroupsByYear = await fetchGroupsByYear(year as string, group_name as string)
        res.status(200).json(GroupsByYear);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getDeadliestRegions = async (req: Request, res: Response) => {
    const { group_name } = req.query
    try {
        const DeadliestRegionsByGroup = await fetchDeadliestRegionsByGroup(group_name as string)
        res.status(200).json(DeadliestRegionsByGroup);
    } catch (error) {
        res.status(500).json(error);
    }
}