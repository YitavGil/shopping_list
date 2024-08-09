import React from 'react';
import { Container, Typography, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import ShoppingList from './components/ShoppingList';
import ItemTotal from './components/ItemTotal';

const rtlTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={rtlTheme}>
      <CssBaseline />
      <StyledContainer>
        <StyledTypography variant="h3" textAlign="center">
          רשימת קניות
        </StyledTypography>
        <Box mb={4}>
          <ItemTotal />
        </Box>
        <ShoppingList />
      </StyledContainer>
    </ThemeProvider>
  );
};

export default App;