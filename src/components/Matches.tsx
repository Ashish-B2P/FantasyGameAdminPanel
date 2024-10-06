import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Typography, Box, CircularProgress, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'

interface Match {
  id: number
  title: string
  completed: boolean
}

interface Contest {
  id: number
  name: string
  startDate: string
  endDate: string
  participants: number
  prize: number
}

const matchColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Match Title', width: 300 },
  { field: 'completed', headerName: 'Completed', width: 130, type: 'boolean' },
]

const contestColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Contest Name', width: 200 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  { field: 'endDate', headerName: 'End Date', width: 150 },
  { field: 'participants', headerName: 'Participants', width: 120, type: 'number' },
  { field: 'prize', headerName: 'Prize Pool', width: 150, type: 'number' },
]

const fetchMatches = async (): Promise<Match[]> => {
  // Simulating API call with mock data
  await new Promise(resolve => setTimeout(resolve, 1000))
  const realMatches = [
    "Manchester United vs Liverpool",
    "Barcelona vs Real Madrid",
    "Bayern Munich vs Borussia Dortmund",
    "Juventus vs AC Milan",
    "Paris Saint-Germain vs Marseille",
    "Arsenal vs Tottenham Hotspur",
    "Ajax vs Feyenoord",
    "Boca Juniors vs River Plate",
    "Flamengo vs Corinthians",
    "Celtic vs Rangers"
  ]
  return realMatches.map((match, index) => ({
    id: index + 1,
    title: match,
    completed: Math.random() < 0.5
  }))
}

const fetchContestsForMatch = async (matchId: number): Promise<Contest[]> => {
  // Simulating API call with mock data
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, name: 'Goal Predictor', startDate: '2023-06-01', endDate: '2023-06-02', participants: 1500, prize: 5000 },
    { id: 2, name: 'First Goalscorer', startDate: '2023-06-01', endDate: '2023-06-02', participants: 1200, prize: 3000 },
    { id: 3, name: 'Correct Score', startDate: '2023-06-01', endDate: '2023-06-02', participants: 800, prize: 2000 },
  ]
}

const Matches: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const { data: matches, isLoading, error } = useQuery(['matches'], fetchMatches)
  const { data: contests, isLoading: isLoadingContests } = useQuery(
    ['contests', selectedMatch?.id],
    () => selectedMatch ? fetchContestsForMatch(selectedMatch.id) : Promise.resolve([]),
    { enabled: !!selectedMatch }
  )

  const handleRowClick = (params: GridRowParams) => {
    setSelectedMatch(params.row as Match)
  }

  const handleCloseDialog = () => {
    setSelectedMatch(null)
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">Error fetching matches: {(error as Error).message}</Typography>
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Matches
      </Typography>
      <DataGrid
        rows={matches || []}
        columns={matchColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        onRowClick={handleRowClick}
      />
      <Dialog open={!!selectedMatch} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Contests for {selectedMatch?.title}</DialogTitle>
        <DialogContent>
          {isLoadingContests ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={contests || []}
              columns={contestColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              autoHeight
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Matches