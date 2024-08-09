import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface OrderCompleteDialogProps {
  isOpen: boolean;
  message: string;
  hasItems: boolean;
  onClose: () => void;
}

const OrderCompleteDialog: React.FC<OrderCompleteDialogProps> = ({ 
  isOpen, 
  message, 
  hasItems, 
  onClose 
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {message}
   
      </DialogTitle>
      <DialogContent>
        <Typography>
          {hasItems ? 'תודה על הזמנתך!' : 'נא להוסיף פריטים להזמנה.'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderCompleteDialog;