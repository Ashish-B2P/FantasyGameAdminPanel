import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Typography, Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'website', headerName: 'Website', width: 130 },
]

const fetchPlayers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const Players: React.FC = () => {
  const { data: players, isLoading, error } = useQuery(['players'], fetchPlayers)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">Error fetching players: {(error as Error).message}</Typography>
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Players
      </Typography>
      <DataGrid
        rows={players || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  )
}

export default Players