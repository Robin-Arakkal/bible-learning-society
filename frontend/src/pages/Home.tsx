import React from 'react';
import { Container, Typography, Box, Grid, Paper, Fade, Zoom } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Bible Study',
      description: 'Access comprehensive Bible study materials and resources.',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Learning',
      description: 'Engage in structured learning programs designed for all levels.',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Community',
      description: 'Join a supportive community of believers and learners.',
    },
  ];

  return (
    <Box 
      sx={{ 
        py: 8, 
        bgcolor: 'background.default',
        background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              Welcome to Bible Learning Society
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Your journey to deeper understanding and spiritual growth starts here.
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
                      '& .MuiSvgIcon-root': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.light',
                      mb: 2,
                      opacity: 0.1,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mt: 2, 
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}; 