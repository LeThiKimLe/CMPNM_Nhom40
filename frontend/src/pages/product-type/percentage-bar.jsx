import React from 'react';
import { Stack } from '@mui/material';
import MDTypography from '../../components/MDTypography';

import MDBox from '../../components/MDBox';
import StarIcon from '@mui/icons-material/Star';

const PercentageBar = ({ star, percentage }) => {
  return (
    <Stack alignItems="center" justifyContent="space-between" direction="row">
      <MDTypography
        sx={{
          fontWeight: '600',
          color: '#111111',
          fontSize: '14px',
          marginLeft: '10px',
        }}
      >
        {star}
      </MDTypography>
      <StarIcon sx={{ padding: '1px 3px 3px 3px' }} />
      <div
        style={{
          width: '200px',
          height: '3px',
          backgroundColor: '#bcbcbc',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#fe8c23',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>
      <MDBox sx={{ width: '35px' }}>
        <MDTypography
          sx={{
            fontWeight: '600',
            color: '#111111',
            fontSize: '14px',
            marginLeft: '10px',
          }}
        >
          {!percentage ? 0 : percentage}%
        </MDTypography>
      </MDBox>
    </Stack>
  );
};
export default PercentageBar;
