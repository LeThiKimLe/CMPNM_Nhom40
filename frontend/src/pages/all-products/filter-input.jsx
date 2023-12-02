import React from 'react';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import MDTypography from '../../components/MDTypography';

const FilterInput = ({ data, onChange, title }) => {
  return (
    <Stack direction="column" sx={{ marginBottom: '15px' }}>
      <MDTypography
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#323232',
          marginBottom: '8px',
        }}
      >
        {title}
      </MDTypography>
      {data.map((item, index) => {
        return (
          <FormControlLabel
            key={index}
            label={
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '600',
                }}
              >
                {item.value}
              </MDTypography>
            }
            control={<Checkbox value={item.value} onChange={onChange} />}
          />
        );
      })}
    </Stack>
  );
};

export default FilterInput;
