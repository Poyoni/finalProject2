
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchHighestCasualtyRegions, fetchDeadliestAttacks, fetchIncidentTrends, fetchDeadliestRegions, fetchTopGroups, fetchGroupsByYear } from '../../app/featuers/data/dataSlice';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid ,SelectChangeEvent} from '@mui/material';

const FilterSelect = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRange, setSelectedRange] = useState('');
  const [organizationType, setOrganizationType] = useState('all');
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    year: '',
    range: '',
    fromYear: '',
    toYear: '',
    organization: '',
    area: ''
  });

  const regions = [
    "Australasia & Oceania",
    "Central America & Caribbean",
    "Central Asia",
    "East Asia",
    "Eastern Europe",
    "Middle East & North Africa",
    "North America",
    "South America",
    "South Asia",
    "Southeast Asia",
    "Sub-Saharan Africa",
    "Western Europe"
  ];

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleOrganizationTypeChange = (event: SelectChangeEvent<string>) => {
    setOrganizationType(event.target.value as string);
  };

  const handleFormChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setSelectedRegion(value as string);
    setSelectedRange(value as string);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedOption === 'getDeadliestAttacks') {
        dispatch(fetchDeadliestAttacks());
      } else if (selectedOption === 'getHighestCasualtyRegions') {
        dispatch(fetchHighestCasualtyRegions(selectedRegion));
      } else if (selectedOption === 'getIncidentTrends') {
        const trendData = selectedRange === 'specificYear'
          ? { year: formData.year }
          : selectedRange === 'years'
          ? { fromYear: formData.fromYear, toYear: formData.toYear }
          : { range: selectedRange };
        dispatch(fetchIncidentTrends(trendData));
      } else if (selectedOption === 'getTopGroups') {
        dispatch(fetchTopGroups({ region: selectedRegion, topOnly: organizationType }));
      } else if (selectedOption === 'getGroupsByYear') {
        dispatch(fetchGroupsByYear({ year: formData.year, organization: formData.organization }));
      } else if (selectedOption === 'getDeadliestRegions') {
        dispatch(fetchDeadliestRegions(formData.organization));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="filter-container" style={{ direction: 'rtl', textAlign: 'right', color: '#243642' }} >
      <h3 className="filter-title">בחר סוג בקשה</h3>

      <FormControl fullWidth margin="normal">
        <InputLabel>בחר אפשרות</InputLabel>
        <Select value={selectedOption} onChange={handleSelectChange}>
          <MenuItem value="getDeadliestAttacks">דירוג של סוגי המתקפות</MenuItem>
          <MenuItem value="getHighestCasualtyRegions">איזורים עם ממוצע הגבוה ביותר בכל פיגוע</MenuItem>
          <MenuItem value="getIncidentTrends">מגמות שנתיות</MenuItem>
          <MenuItem value="getTopGroups">אירגונים בוטלים לפי איזור</MenuItem>
          <MenuItem value="getGroupsByYear">אירוגנים שפעלו לפי שנה</MenuItem>
          <MenuItem value="getDeadliestRegions">איזורים שנפגעו לפי ארגון</MenuItem>
        </Select>
      </FormControl>

      {selectedOption === 'getHighestCasualtyRegions' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>סינון לפי</InputLabel>
          <Select value={selectedRegion} name="region" onChange={handleFormChange}>
            <MenuItem value="region_txt">סנן לפי איזור</MenuItem>
            <MenuItem value="country_txt">סנן לפי מדינה</MenuItem>
            <MenuItem value="city">סנן לפי עיר</MenuItem>
          </Select>
        </FormControl>
      )}

      {selectedOption === 'getIncidentTrends' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>בחר טווח</InputLabel>
          <Select value={selectedRange} name="range" onChange={handleFormChange}>
            <MenuItem value="specificYear">בחירת שנה ספציפית</MenuItem>
            <MenuItem value="years">בחירת טווח שנים</MenuItem>
            <MenuItem value="5">5 שנים אחרונות</MenuItem>
            <MenuItem value="10">10 שנים אחרונות</MenuItem>
          </Select>
        </FormControl>
      )}

      {selectedRange === 'specificYear' && (
        <TextField
          fullWidth
          label="בחר שנה"
          name="year"
          value={formData.year || ''}
          onChange={handleInputChange}
          margin="normal"
        />
      )}

      {selectedRange === 'years' && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="משנה"
              name="fromYear"
              value={formData.fromYear || ''}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="עד שנה"
              name="toYear"
              value={formData.toYear || ''}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
        </Grid>
      )}

      {selectedOption === 'getTopGroups' && (
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel>בחר איזור</InputLabel>
            <Select value={selectedRegion} name="region" onChange={handleFormChange}>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>סוג תצוגת ארגונים</InputLabel>
            <Select value={organizationType} onChange={handleOrganizationTypeChange}>
              <MenuItem value="all">כל הארגונים</MenuItem>
              <MenuItem value="5">חמשת הארגונים המובילים</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      {selectedOption === 'getGroupsByYear' && (
        <div>
          <TextField
            fullWidth
            label="בחר ארגון"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="בחר שנה"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            margin="normal"
          />
        </div>
      )}

      {selectedOption === 'getDeadliestRegions' && (
        <TextField
          fullWidth
          label="הכנס שם ארגון"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          margin="normal"
        />
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        שלח
      </Button>
    </div>
  );
};

export default FilterSelect;
