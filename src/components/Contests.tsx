import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Typography, Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface Contest {
  id: number
  name: string
  matchTitle: string
  startDate: string
  endDate: string
  participants: number
  prize: number
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Contest Name', width: 200 },
  { field: 'matchTitle', headerName: 'Match', width: 200 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  { field: 'endDate', headerName: 'End Date', width: 150 },
  { field: 'participants', headerName: 'Participants', width: 120, type: 'number' },
  { field: 'prize', headerName: 'Prize Pool', width: 150, type: 'number' },
]

const fetchAllContests = async (): Promise<Contest[]> => {
  // Simulating API call with mock data
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, name: 'Summer League', matchTitle: 'Match A', startDate: '2023-06-01', endDate: '2023-08-31', participants: 16, prize: 10000 },
    { id: 2, name: 'Champions Cup', matchTitle: 'Match B', startDate: '2023-09-15', endDate: '2023-12-15', participants: 32, prize: 50000 },
    { id: 3, name: 'Winter Classic', matchTitle: 'Match C', startDate: '2024-01-10', endDate: '2024-03-20', participants: 24, prize: 25000 },
    { id: 4, name: 'Regional Showdown', matchTitle: 'Match D', startDate: '2023-07-01', endDate: '2023-07-31', participants: 8, prize: 5000 },
    { id: 5, name: 'Youth Tournament', matchTitle: 'Match E', startDate: '2023-08-05', endDate: '2023-08-15', participants: 64, prize: 15000 },
  ]
}

const Contests: React.FC = () => {
  const { data: contests, isLoading, error } = useQuery(['allContests'], fetchAllContests)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">Error fetching contests: {(error as Error).message}</Typography>
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        All Contests
      </Typography>
      <DataGrid
        rows={contests || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  )
}

export default Contests