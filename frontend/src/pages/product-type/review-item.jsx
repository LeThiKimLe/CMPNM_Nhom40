import React from 'react';
import MDTypography from '../../components/MDTypography';
import MDBox from '../../components/MDBox';
import { Rating, Divider, Stack } from '@mui/material';

const ReviewItem = ({ review }) => {
  return (
    <MDBox
      sx={{ display: 'flex', paddingLeft: '8px', flexDirection: 'column' }}
    >
      <MDTypography
        sx={{
          fontWeight: '700',
          color: '#333333',
          fontSize: '14px',
        }}
      >
        {review && review.user
          ? `${review.user.firstName} ${review.user.lastName}`
          : null}
      </MDTypography>
      <Rating
        name="read-only"
        size="small"
        value={review && review.rating ? review.rating : null}
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#fe8c23',
          },
          '& .MuiRating-iconEmpty': {
            color: 'grey',
          },
        }}
      />
      <MDTypography
        sx={{
          fontWeight: '400',
          color: '#333333',
          fontSize: '14px',
        }}
      >
        {review && review.comment ? `${review.comment}` : null}
      </MDTypography>
      <Divider sx={{ height: '1px' }} />
    </MDBox>
  );
};

export default ReviewItem;
