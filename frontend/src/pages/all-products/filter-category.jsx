import React from 'react';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import MDTypography from '../../components/MDTypography';

const FilterCategory = ({ data, onChange }) => {
  return (
    <Stack sx={{ marginBottom: '15px', minWidth: '210px' }}>
      <MDTypography
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#323232',
          marginBottom: '8px',
        }}
      >
        Category
      </MDTypography>
      {data && data.length !== 0
        ? data.map((item, index) => {
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
                    {item.name}
                  </MDTypography>
                }
                control={<Checkbox value={item.slug} onChange={onChange} />}
              />
            );
          })
        : null}
    </Stack>
  );
};

export default FilterCategory;
