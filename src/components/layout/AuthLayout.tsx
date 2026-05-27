import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F5F7FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </Box>
  );
}
