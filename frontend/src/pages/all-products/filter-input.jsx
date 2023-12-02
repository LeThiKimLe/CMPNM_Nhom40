import React from 'react';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import './custom.css';

const FilterInput = ({ data, onChange, title }) => {
  return (
    <Stack direction="column" sx={{ marginBottom: '15px' }}>
      <MDTypography className="title-element">{title}</MDTypography>
      {data.map((item, index) => {
        return (
          <FormControlLabel
            key={index}
            label={
              <MDTypography className="category-title">
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
