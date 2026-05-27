import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import AppTopBar from './AppTopBar';

export default function AppShell() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F7FA' }}>
      <AppSidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <AppTopBar />
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
