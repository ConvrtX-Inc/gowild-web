import Logo from '../../components/Logo';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

const VerifyCode: FC = () => {
  return (
    <>
      <Helmet>
        <title>Verify Code | Go Wild</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth='sm' sx={{ py: 10 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <RouterLink to='/'>
              <Logo
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8
            }}
          />
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography color='textPrimary' gutterBottom variant='h4'>
                    Verify Code
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                    Confirm registration using your verification code
                  </Typography>
                </div>
                <Box
                  sx={{
                    height: 32,
                    '& > img': {
                      maxHeight: '100%',
                      width: 'auto'
                    }
                  }}
                >
                  <img alt='Auth platform' src='/static/icons/jwt.svg' />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default VerifyCode;
