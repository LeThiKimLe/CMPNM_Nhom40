import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Rating,
  Box,
  Stack,
  Divider,
  DialogTitle,
  Dialog,
} from '@mui/material';
import MDTypography from '../../components/MDTypography';
import { useDispatch } from 'react-redux';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import PercentageBar from './percentage-bar';
import ReviewModal from './model-review.jsx';
import userThunk from '../../features/user/user.service';
import ReviewItem from './review-item.jsx';
import './style.css';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <MDBox
      shadow="lg"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        marginLeft: '5px',
        marginBottom: '5px',
        fontSize: '0.875rem',
        fontWeight: '700',
        borderRadius: '10px',
        width: '72px',
        height: '72px',
        ...sx,
      }}
      {...other}
    />
  );
}
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ReviewComponent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { product } = props;
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(3);
  const [openReview, setOpenReview] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [show, setShow] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [comment, setComment] = useState('');

  const handleChangeUpload = ({ fileList: newFileList }) => {
    // Kiểm tra nếu số lượng file đã upload đạt tối đa 3 thì không cho phép upload nữa
    // Cập nhật lại state fileList
    setFileList(newFileList);
  };
  const onChangeRating = (event, newValue) => {
    if (show === 0) {
      setShow(1);
    }
    setValue(newValue);
  };
  const indexReviewUser = useMemo(() => {
    let value = -1;
    if (user.user) {
      if (
        reviewData &&
        reviewData.reviews &&
        Object.keys(reviewData.reviews).length > 0
      ) {
        reviewData.reviews.map((item, index) => {
          if (
            item.user._id === user.user.userId &&
            item.product === product._id
          ) {
            value = index;
          }
        });
      }
    }
    return value;
  }, [product._id, reviewData, user]);
  const onCloseHandle = () => {
    setComment('');
    setShow(0);
    setFileList([]);
    setValue(3);
    setOpenReview(false);
  };

  const handleAddRating = async () => {
    setLoading(true);
    let reviewData = {};
    console.log(comment, fileList);
    let listImage = [];
    if (fileList.length > 0) {
      fileList.forEach((file, index) => {
        const image = getBase64(file.originFileObj);
        listImage.push(image);
      });
    }
    Promise.all([...listImage])
      .then((values) => {
        reviewData.listImage = values;
        reviewData.rating = value;
        reviewData.product = product._id;
        if (comment !== '') {
          reviewData.comment = comment;
        }
        return dispatch(userThunk.createReviewAPI(reviewData)).unwrap();
      })
      .then((value) => {
        setLoading(false);
        setShowDialog(true);
        setOpenReview(false);
        return dispatch(userThunk.getReviewAPI(product._id)).unwrap();
      })
      .then((value) => {
        console.log('review dât', value);
        setReviewData(value);
      });
  };
  useEffect(() => {
    if (product) {
      dispatch(userThunk.getReviewAPI(product._id))
        .unwrap()
        .then((value) => {
          console.log(value);
          setReviewData(value);
        });
    }
  }, [product, dispatch]);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'block',
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <ReviewModal
        open={openReview}
        product={product}
        fileList={fileList}
        handleChangeUpload={handleChangeUpload}
        value={value}
        loading={loading}
        onChangeRating={onChangeRating}
        show={show}
        comment={comment}
        setComment={setComment}
        handleAddRating={handleAddRating}
        onCloseHandle={onCloseHandle}
      />
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Cảm ơn bạn đã đánh giá sản phẩm'}
        </DialogTitle>
      </Dialog>
      <MDTypography
        sx={{
          fontWeight: '700',
          color: '#111',
          fontSize: '20px',
        }}
      >
        Đánh giá Điện thoại {product.name}
      </MDTypography>
      <MDBox display="flex" justifyContent="flex-start">
        <MDBox>
          <Stack
            alignItems="center"
            justifyContent="flex-start"
            direction="row"
            spacing={1}
            sx={{ marginLeft: '10px' }}
          >
            <MDTypography
              sx={{
                fontWeight: '700',
                color: '#fe8c23',
                fontSize: '22px',
              }}
            >
              {reviewData && reviewData.averageRating
                ? reviewData.averageRating
                : 0}
            </MDTypography>

            <Rating
              name="read-only"
              precision={0.5}
              value={
                reviewData && reviewData.averageRating
                  ? reviewData.averageRating
                  : 0
              }
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#fe8c23',
                },
                '& .MuiRating-iconEmpty': {
                  color: 'grey',
                },
              }}
            />
            <MDBox>
              <MDTypography
                sx={{
                  fontWeight: '600',
                  color: '#111111',
                  fontSize: '14px',
                  marginTop: '3px',
                }}
              >
                {reviewData && reviewData.reviewCount
                  ? reviewData.reviewCount
                  : 0}{' '}
                Đánh giá
              </MDTypography>
            </MDBox>
          </Stack>

          {reviewData && reviewData.ratingPercentage
            ? reviewData.ratingPercentage.map((item, index) => {
                const star = (index + 1).toString();
                return (
                  <PercentageBar key={index} star={star} percentage={item} />
                );
              })
            : null}
        </MDBox>
        <Divider orientation="vertical" />
        <MDBox
          variant="contained"
          borderRadius="lg"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
          }}
        >
          {reviewData && reviewData.images
            ? reviewData.images.map((url, index) => {
                console.log('chay');
                return (
                  <Item key={index}>
                    <img
                      src={url}
                      width="100%"
                      alt="tiep"
                      height="100%"
                      style={{ borderRadius: '5px' }}
                    />
                  </Item>
                );
              })
            : null}
        </MDBox>
      </MDBox>

      <Divider />
      <MDBox sx={{ marginBottom: '10px' }}>
        {reviewData && reviewData.reviews
          ? reviewData.reviews.map((item, index) => {
              return <ReviewItem key={index} review={item} />;
            })
          : null}
      </MDBox>
      {indexReviewUser === -1 ? (
        <MDBox display="flex" justifyContent="space-between">
          <MDButton
            size="medium"
            color="dark"
            variant="contained"
            sx={{
              textTransform: 'initial !important',
              fontWeight: '500',
              width: '49%',
              textAlign: 'center',
            }}
            onClick={() => setOpenReview(true)}
          >
            Viết đánh giá
          </MDButton>

          <MDButton
            size="medium"
            color="dark"
            variant="outlined"
            sx={{
              textTransform: 'initial !important',
              fontWeight: '500',
              width: '49%',
              textAlign: 'center',
            }}
          >
            {reviewData && reviewData.reviewCount > 0
              ? `Xem ${reviewData.reviewCount} đánh giá`
              : 'Chưa có đánh giá'}
          </MDButton>
        </MDBox>
      ) : null}
    </Box>
  );
};

export default ReviewComponent;
