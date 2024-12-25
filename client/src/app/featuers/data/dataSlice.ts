import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IDeadliestAttacksStats, IAttackGroupStats, IDeadliestRegionStats, IAttackTypeStats, IGroupStats, IYearStats, ITerrorAttackStats} from '../../../types/attackType'
import axios from 'axios';

interface RegionState {
  data: IDeadliestAttacksStats[] | IAttackGroupStats[] | IDeadliestRegionStats[] | IAttackTypeStats[] | IGroupStats[] | IYearStats[] | ITerrorAttackStats[] | any ;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RegionState = {
  data: null,
  status: 'idle',
  error: null,
};
//בקשה 1
export const fetchDeadliestAttacks = createAsyncThunk<IAttackTypeStats[]>(
  'regions/fetchDeadliestAttacks',
  async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/analysis/deadliest-attack-types/`);
      console.log(response.data)
      return response.data;
    }catch(error){
      return error
    }
  }
)
//בקשה 2
export const fetchHighestCasualtyRegions = createAsyncThunk <IDeadliestAttacksStats[], string, {rejectValue: string;}>(
  'regions/fetchHighestCasualtyRegions',
  async (region: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/analysis/highest-casualty-regions/?region=${region}`);
      console.log(response.data)
      return response.data;

    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'משהו השתבש');
    }
  }
);

//בקשה 3
export const fetchIncidentTrends = createAsyncThunk <IYearStats[],{ year?: string; fromYear?: string; toYear?: string; range?: string }, {rejectValue: string;}>(
  'regions/fetchIncidentTrends',
  async (payload: { year?: string; fromYear?: string; toYear?: string; range?: string }) => {
    let query = '';
    if (payload.year) {
      query = `year=${payload.year}`;
    } else if (payload.fromYear && payload.toYear) {
      query = `fromYear=${payload.fromYear}&toYear=${payload.toYear}`;
    } else if (payload.range) {
      query = `lastYears=${payload.range}`;
    }
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/analysis/incident-trends/?${query}`);
      console.log(response)
      return response.data;
    }catch(error){
      return error
    }
  }
)
//בקשה 4
export const fetchTopGroups = createAsyncThunk<IAttackGroupStats[], { region: string; topOnly: string }, { rejectValue: string; }>(
  'regions/fetchTopGroups',
  async ({ region, topOnly }: { region: string; topOnly: string }, { rejectWithValue }) => {
    console.log(region, topOnly);
    
    let api: string; 
    
    if (topOnly === '5') {
      api = `${import.meta.env.VITE_BACKEND_URL}/relationships/top-groups?region=${region}&top5=${topOnly}`;
    } else {
      api = `${import.meta.env.VITE_BACKEND_URL}/relationships/top-groups?region=${region}`;
    }

    try {
      const response = await axios.get(api); 
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'משהו השתבש');
    }
  }
);

//בקשה 5
export const fetchGroupsByYear = createAsyncThunk <IGroupStats[],{ year: string; organization: string }, {rejectValue: string;}>(
  'regions/fetchGroupsByYear',
  async ({ year, organization }: { year: string; organization: string }) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/relationships/groups-by-year/?year=${year}&group_name=${organization}`);
      console.log(response.data)
      return response.data;
    }catch(error){
      return error
    }
  }
)
//בקשה 6
export const fetchDeadliestRegions = createAsyncThunk <IDeadliestRegionStats[], string, {rejectValue: string;}>(
  'regions/fetchDeadliestRegions',
  async (org: string) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/relationships/deadliest-regions/?group_name=${org}`);
      console.log(response.data)
      return response.data;
    }catch(error){
      return error
    }
  }
)

const dataSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeadliestAttacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeadliestAttacks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as IAttackTypeStats[];
      })
      .addCase(fetchDeadliestAttacks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchHighestCasualtyRegions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHighestCasualtyRegions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as IDeadliestAttacksStats[];
      })
      .addCase(fetchHighestCasualtyRegions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchIncidentTrends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncidentTrends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as IYearStats[];
      })
      .addCase(fetchIncidentTrends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchTopGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as IAttackGroupStats[]; ;
      })
      .addCase(fetchTopGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchGroupsByYear.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroupsByYear.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as IGroupStats[];
      })
      .addCase(fetchGroupsByYear.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchDeadliestRegions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeadliestRegions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as IDeadliestRegionStats[];
      })
      .addCase(fetchDeadliestRegions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
    },
  }
);

export default dataSlice.reducer;
