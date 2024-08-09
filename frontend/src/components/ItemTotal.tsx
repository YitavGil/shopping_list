import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { RootState } from '../store/store';

const ItemTotal: React.FC = () => {
  const totalItems = useSelector((state: RootState) => state.shopping.totalItems);

  return (
    <Box textAlign="center">
      <Typography variant="h5">
        סה"כ: {totalItems} מוצרים בסל
      </Typography>
    </Box>
  );
};

export default ItemTotal;