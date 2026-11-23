import { Box, Card, CardContent, Chip, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';


export function ProgressPanel({ total, completed }: { total: number | undefined; completed: number | undefined }) {
  const percentage = total ? Math.round(((completed ?? 0) / total) * 100) : 0;
  const allDone = total !== undefined && total > 0 && total === completed;
  return (
    <Stack component="aside" aria-label="Your task progress" spacing={2.5}>
      <Card sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText' }}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Typography component="h2" variant="h2" sx={{ mt: 2 }}>
            A  progress bar to keep you on track.
          </Typography>
          <Box sx={{ display: 'inline-flex', position: 'relative', my: 3 }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={140}
              thickness={3}
              color="inherit"
              aria-hidden="true" sx={{ opacity: 0.2 }}
            />
            <CircularProgress
              variant="determinate"
              value={percentage}
              size={140}
              thickness={3}
              color="inherit"
              aria-label={total === undefined ? 'Task progress unavailable' : `${percentage}% of tasks completed`}
              sx={{ position: 'absolute', left: 0 }} />
            <Stack sx={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h2" component="span" sx={{ fontSize: '2rem' }}>{total === undefined ? '—' : `${percentage}%`}</Typography>
              <Typography variant="caption">complete</Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />} sx={{ justifyContent: 'center' }}>
            <Box><Typography variant="h2" component="p">
              {total === undefined ? '—' : total - (completed ?? 0)}
            </Typography>
              <Typography variant="caption">
                to go
              </Typography>
            </Box>
            <Box>
              <Typography variant="h2" component="p">
                {completed ?? '—'}</Typography>
              <Typography variant="caption">
                done
              </Typography>
            </Box>
          </Stack>
          <Chip icon={<CheckRounded />}
            size="small"
            label={allDone ? 'All Done!' : 'Your pace. Your progress.'}
            sx={{ mt: 3, bgcolor: 'transparent', color: 'inherit', '& .MuiChip-icon': { color: 'inherit' } }} />
        </CardContent>
      </Card>
    </Stack>
  );
}
