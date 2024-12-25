import express from 'express';
import { getDeadliestAttacks, getHighestCasualtyRegions, getIncidentTrends, getTopGroups, getGroupsByYear, getDeadliestRegions  } from '../controllers/AttackController';

const router = express.Router();

router.route('/analysis/deadliest-attack-types/').get(getDeadliestAttacks);
router.route('/analysis/highest-casualty-regions/').get(getHighestCasualtyRegions);
router.route('/analysis/incident-trends/').get(getIncidentTrends);
router.route('/relationships/top-groups/').get(getTopGroups);
router.route('/relationships/groups-by-year/').get(getGroupsByYear);
router.route('/relationships/deadliest-regions/').get(getDeadliestRegions);

export default router;
