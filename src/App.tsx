import React from 'react'
import { CssBaseline } from '@mui/material'
import { Users, Activity, Settings, BarChart, Trophy } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Players from './components/Players'
import Matches from './components/Matches'
import Contests from './components/Contests'
import SettingsComponent from './components/Settings'
import { ThemeProvider } from './components/ThemeContext'

function App() {
  const [activeComponent, setActiveComponent] = React.useState('Dashboard')

  const menuItems = [
    { icon: BarChart, label: 'Dashboard', link: '#' },
    { icon: Users, label: 'Players', link: '#' },
    { icon: Activity, label: 'Matches', link: '#' },
    { icon: Trophy, label: 'Contests', link: '#' },
    { icon: Settings, label: 'Settings', link: '#' },
  ]

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />
      case 'Players':
        return <Players />
      case 'Matches':
        return <Matches />
      case 'Contests':
        return <Contests />
      case 'Settings':
        return <SettingsComponent />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar menuItems={menuItems} setActiveComponent={setActiveComponent} />
        <main style={{ flexGrow: 1, overflow: 'auto', padding: '24px' }}>
          {renderComponent()}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App