import React from 'react';
import { InputLabel, Input } from '@mui/material';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';

const AddressInputItem = ({
  register,
  htmlFor,
  title,
  errors,
  value,
  onChange,
}) => {
  return (
    <MDBox mb={2}>
      <InputLabel
        sx={{
          marginLeft: '3px',
          marginBottom: '6px',
          color: '#323232',
          fontSize: '13px',
          fontWeight: '600',
        }}
      >
        {title}
      </InputLabel>
      <Input
        className="input-element"
        required
        {...register}
        id={htmlFor}
        name={htmlFor}
        type="text"
        fullWidth
        value={value}
        onChange={onChange}
      />
      {errors && (
        <MDTypography variant="caption" color="error">
          {errors.message}
        </MDTypography>
      )}
    </MDBox>
  );
};

export default AddressInputItem;
