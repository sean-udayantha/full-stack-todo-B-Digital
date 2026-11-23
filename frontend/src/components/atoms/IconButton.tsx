import { Box, IconButton as MuiIconButton, Tooltip, type IconButtonProps as MuiIconButtonProps } from '@mui/material';

type IconButtonProps = MuiIconButtonProps & { label: string };

export function IconButton({ label, ...props }: IconButtonProps) {
  return (
    <Tooltip title={label} describeChild>
      <Box component="span" sx={{ display: 'inline-flex' }}>
        <MuiIconButton type="button" size="small" aria-label={label} {...props} />
      </Box>
    </Tooltip>
  );
}
