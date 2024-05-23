"use client"

import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Providers from './StoreProvider';
import { Box } from '@mui/material';

const theme = createTheme();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Providers>
                        <Box
                            display="flex"
                            flexDirection="column"
                            minHeight="100vh"
                            bgcolor="#f5f5f5"
                        >
                            {children}
                        </Box>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
