
import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Card, CardContent, Typography, CircularProgress, Box, Fade } from '@mui/material';
import { WarningAmber, ErrorOutline } from '@mui/icons-material';

const StatisticsComponent: React.FC = () => {
  const rawData = useSelector((state: RootState) => state.data.data);
  const status = useSelector((state: RootState) => state.data.status);


  if (status === 'loading') {
    return (
      <Card sx={{ width: '100%', height: '100%', boxShadow: 3, padding: 2 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }


  if (!rawData) {
    console.error('No data found!');
    return (
      <Card sx={{ width: '100%', height: '100%', boxShadow: 3, padding: 2 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Fade in={true} timeout={1000}>
              <WarningAmber sx={{ fontSize: 60, color: '#ff9800' }} />
            </Fade>
            <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
              לא נמצאו נתונים
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const renderChart = () => {
    const data = Array.isArray(rawData) ? rawData : [rawData];

    if (!data.length) {
      console.error("No data found!");
      return (
        <Card sx={{ width: '100%', height: '100%', boxShadow: 3, padding: 2 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Fade in={true} timeout={1000}>
                <ErrorOutline sx={{ fontSize: 60, color: '#f44336' }} />
              </Fade>
              <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
                לא נמצאו נתונים מתאימים להצגה
              </Typography>
            </Box>
          </CardContent>
        </Card>
      );
    }

    if (data[0] && 'year' in data[0]) {
      console.log("Displaying LineChart");
      return (
        <Box sx={{ width: '100%', height: '100%', padding: 2 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year"  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalAttacks" stroke="#82ca9d" name="מספר אירועים" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      );
    }

    if (data[0] && 'group' in data[0]) {
      console.log("Displaying BarChart");
      return (
        <Box sx={{ width: '100%', height: '100%', padding: 2 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom></Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalAttacks" fill="#82ca9d" name="מספר אירועים">
                    <LabelList dataKey="totalAttacks" position="top" fontSize={12} fill="#000" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      );
    }

    if (data[0] && 'attackType' in data[0]) {
      console.log("Displaying BarChart for attack types");
      return (
        <Box sx={{ width: '100%', height: '100%', padding: 2 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom></Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attackType" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalCasualties" fill="#82ca9d" name="מספר נפגעים">
                    <LabelList dataKey="totalCasualties" position="top" fontSize={12} fill="#000" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      );
    }

    console.warn('No valid data format found for rendering.');
    return (
      <Card sx={{ width: '100%', height: '100%', boxShadow: 3, padding: 2 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant="h6" color="textSecondary">לא נמצאו נתונים מתאימים להצגה</Typography>
        </CardContent>
      </Card>
    );
  };

  return renderChart();
};

export default StatisticsComponent;