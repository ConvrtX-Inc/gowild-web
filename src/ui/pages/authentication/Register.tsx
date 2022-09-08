import Logo from '../../components/Logo';
import { RegisterJWT } from '../../components/authentication/register';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

const Register: FC = () => {
  return (
    <>
      <Helmet>
        <title>Register | Go Wild</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth='sm' sx={{ py: '80px' }}>
          <Box
            sx={{
              mb: 8,
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
                    Register
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                    Register on the internal platform
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
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                <RegisterJWT />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link
                color='textSecondary'
                component={RouterLink}
                to='/authentication/login'
                variant='body2'
              >
                Having an account
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;