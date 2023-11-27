import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import { Stack, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faMoneyBillTransfer,
  faHourglassStart,
  faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons';
const InfoComponent = () => {
  return (
    <MDBox variant="contained" borderRadius="lg" width="100%">
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          marginBottom: '10px',
          boxShadow: '#808191 0px 10.8px 10px 0px',
          borderRadius: '13px',
        }}
      >
        <Grid
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          display="flex"
          spacing={2}
          xs={12}
        >
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <FontAwesomeIcon
                icon={faTruck}
                size="xl"
                style={{ color: '#46bcaa' }}
              />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Fast shipping
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Low shipping fee
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <FontAwesomeIcon
                icon={faMoneyBillTransfer}
                size="xl"
                style={{ color: '#46bcaa' }}
              />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Monetary guarantee
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Money will be refunded within a week
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <FontAwesomeIcon
                icon={faHourglassStart}
                size="xl"
                style={{ color: '#46bcaa' }}
              />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Guarantee
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  One year warranty products
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <FontAwesomeIcon
                icon={faMoneyCheckDollar}
                size="xl"
                style={{ color: '#46bcaa' }}
              />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Payment
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Secure and convenient payment
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </MDBox>
  );
};

export default InfoComponent;
