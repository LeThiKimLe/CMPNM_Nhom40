import React, { useEffect } from 'react';
import { Stack, FormControlLabel, Checkbox } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import { _ } from 'lodash';
const CategoryFilter = (props) => {
  const { categories, categoryFilter, categoryOption, handleCategoryOption } =
    props;
  let list = [];
  useEffect(() => {
    if (Object.keys(categoryFilter).length === 0) {
      list = categories;
    } else {
      list = _.filter(categories, (o) => categoryFilter.includes(o._id));
    }
  }, [categoryFilter])
  return (
    <Stack sx={{ marginBottom: '15px' }}>
      <MDTypography
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#2b3445',
          marginBottom: '8px',
        }}
      >
        Thương hiệu
      </MDTypography>
      {list && list.length !== 0
        ? list.map((item, index) => {
            if (item.level === 1) {
              const checkedValue = categoryOption.includes(item._id);
              return (
                <FormControlLabel
                  key={index}
                  label={item.name}
                  control={
                    <Checkbox
                      value={item._id}
                      checked={checkedValue}
                      onChange={handleCategoryOption}
                    />
                  }
                />
              );
            }
          })
        : null}
    </Stack>
  );
};
export default CategoryFilter;
