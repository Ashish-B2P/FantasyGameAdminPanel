import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { Users, Activity, Trophy, TrendingUp } from 'lucide-react'

const Dashboard: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Total Players', value: '1,234' },
    { icon: Activity, label: 'Matches Played', value: '56' },
    { icon: Trophy, label: 'Tournaments', value: '3' },
    { icon: TrendingUp, label: 'Active Users', value: '789' },
  ]

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography color="text.secondary" gutterBottom>
                {stat.label}
              </Typography>
              <Typography variant="h4" component="div">
                {stat.value}
              </Typography>
              <stat.icon style={{ marginTop: 'auto', alignSelf: 'flex-end' }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Dashboard