import React from 'react'
import { Typography, TextField, Select, MenuItem, Button, Box, Switch, FormControlLabel } from '@mui/material'
import { useTheme } from './ThemeContext'

const Settings: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <form>
        <TextField
          fullWidth
          id="siteName"
          label="Site Name"
          variant="outlined"
          sx={{ mb: 2 }}
          defaultValue="Soccer Admin"
        />
        <Select
          fullWidth
          id="language"
          label="Language"
          variant="outlined"
          sx={{ mb: 2 }}
          defaultValue="English"
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Spanish">Spanish</MenuItem>
          <MenuItem value="French">French</MenuItem>
        </Select>
        <Select
          fullWidth
          id="timezone"
          label="Timezone"
          variant="outlined"
          sx={{ mb: 2 }}
          defaultValue="UTC"
        >
          <MenuItem value="UTC">UTC</MenuItem>
          <MenuItem value="EST">EST</MenuItem>
          <MenuItem value="PST">PST</MenuItem>
        </Select>
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              name="darkMode"
              color="primary"
            />
          }
          label="Dark Mode"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Settings
        </Button>
      </form>
    </Box>
  )
}

export default Settings