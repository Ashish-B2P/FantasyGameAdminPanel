import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme as useMuiTheme } from '@mui/material'

interface MenuItem {
  icon: LucideIcon
  label: string
  link: string
}

interface SidebarProps {
  menuItems: MenuItem[]
  setActiveComponent: (component: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, setActiveComponent }) => {
  const theme = useMuiTheme()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center', color: theme.palette.primary.main }}>
        Soccer Admin
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => setActiveComponent(item.label)}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <item.icon color={theme.palette.primary.main} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar