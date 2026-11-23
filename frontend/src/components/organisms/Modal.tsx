import { useId, type ReactNode } from 'react';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton } from '../atoms/IconButton';

interface ModalProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  busy?: boolean;
}

export function Modal({ title, subtitle, children, onClose, busy = false }: ModalProps) {
  const titleId = useId();
  const subtitleId = useId();
  return (
    <Dialog
      open onClose={() => { if (!busy) onClose(); }}
      aria-labelledby={titleId} aria-describedby={subtitle ? subtitleId : undefined}
      slotProps={{ transition: { onEntered: (node) => node.querySelector<HTMLElement>('[data-autofocus]')?.focus() } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', px: 3, pt: 3 }}>
        <Box>
          <Typography variant="overline" color="text.secondary">A little more clarity</Typography>
          <DialogTitle id={titleId} sx={{ p: 0 }}>{title}</DialogTitle>
        </Box>
        <IconButton label="Close dialog" disabled={busy} onClick={onClose}><CloseRounded /></IconButton>
      </Box>
      <DialogContent sx={{ pt: 2 }}>
        {subtitle && <DialogContentText id={subtitleId} sx={{ mb: 3 }}>{subtitle}</DialogContentText>}
        {children}
      </DialogContent>
    </Dialog>
  );
}
