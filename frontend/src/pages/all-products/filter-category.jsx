import React from 'react';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import './custom.css';
const FilterCategory = ({ data, onChange }) => {
  return (
    <Stack sx={{ marginBottom: '15px', minWidth: '210px' }}>
      <MDTypography className="title-element">Category</MDTypography>
      {data && data.length !== 0
        ? data.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                label={
                  <MDTypography className="category-title">
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
