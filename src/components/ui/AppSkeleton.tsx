import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

type SkeletonVariant = 'table' | 'card' | 'form' | 'kpi';

interface AppSkeletonProps {
  variant: SkeletonVariant;
}

function TableSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 1 }} />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={52} sx={{ borderRadius: 1 }} />
      ))}
    </Stack>
  );
}

function CardSkeleton() {
  return (
    <Stack spacing={1.5} sx={{ p: 2 }}>
      <Skeleton variant="text" width="40%" height={24} />
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="90%" height={16} />
      <Skeleton variant="text" width="75%" height={16} />
    </Stack>
  );
}

function FormSkeleton() {
  return (
    <Stack spacing={2.5} sx={{ p: 2 }}>
      {[...Array(4)].map((_, i) => (
        <Box key={i}>
          <Skeleton variant="text" width="25%" height={14} sx={{ mb: 0.5 }} />
          <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
    </Stack>
  );
}

function KpiSkeleton() {
  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      <Skeleton variant="text" width="50%" height={14} />
      <Skeleton variant="text" width="60%" height={36} />
      <Skeleton variant="text" width="40%" height={14} />
    </Stack>
  );
}

export default function AppSkeleton({ variant }: AppSkeletonProps) {
  switch (variant) {
    case 'table': return <TableSkeleton />;
    case 'card': return <CardSkeleton />;
    case 'form': return <FormSkeleton />;
    case 'kpi': return <KpiSkeleton />;
  }
}
