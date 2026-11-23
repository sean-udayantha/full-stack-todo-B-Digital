import type { ReactNode } from 'react';
import { AppBar, Box, Breadcrumbs, Container, Link, Stack, Toolbar, Typography } from '@mui/material';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';

export function DashboardTemplate({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100dvh' }}>
      <Link href="#main-content" sx={{ position: 'fixed', left: 16, top: -100, zIndex: 'tooltip', bgcolor: 'background.paper', p: 2, '&:focus': { top: 16 } }}>Skip to tasks</Link>
      {sidebar}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
            <Breadcrumbs separator={<ChevronRightRounded fontSize="small" />} aria-label="Breadcrumb">
            <Typography variant="body2" color="text.secondary">
              Workspace
            </Typography>
            </Breadcrumbs>
          </Toolbar>
        </AppBar>
        <Container component="main" id="main-content" tabIndex={-1} maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3, lg: 5 }, flex: 1 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
