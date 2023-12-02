import React, { useState } from 'react';
import { TextField, Modal, Rating, Divider, Stack, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import MDBox from '../../components/MDBox';
import MDAvatar from '../../components/MDAvatar';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import StarIcon from '@mui/icons-material/Star';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: '10px',
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
    border: 'none',
    background: 'none',
  },
}));
const labels = {
  1: 'Rật tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Rất tốt',
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const ReviewModal = ({
  open,
  product,
  fileList,
  value,
  loading,
  onChangeRating,
  handleChangeUpload,
  show,
  comment,
  setComment,
  handleAddRating,
  onCloseHandle,
}) => {
  const classes = useStyles();

  const [hover, setHover] = useState(-1);

  const onChangeActive = (event, newHover) => {
    setHover(newHover);
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseHandle}>
        <div className={classes.paper}>
          <button className={classes.closeButton} onClick={onCloseHandle}>
            <CloseIcon />
          </button>
          <h5>Đánh giá</h5>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <MDAvatar
              variant="square"
              src={product.productPictures[0]}
              name={product.name}
              size="md"
            />
            <MDBox ml={2} lineHeight={1}>
              <MDTypography
                display="block"
                sx={{
                  fontSize: '16px',
                  color: '#344767',
                  fontWeight: '500',
                }}
              >
                {product.name}
              </MDTypography>
            </MDBox>
          </Stack>
          <Box
            sx={{
              width: 400,
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Rating
              name="hover-feedback"
              size="large"
              value={value}
              precision={1}
              getLabelText={getLabelText}
              onChange={onChangeRating}
              onChangeActive={onChangeActive}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />{' '}
            {value !== null && (
              <Box sx={{ ml: 2 }}>
                <MDTypography
                  sx={{
                    fontSize: '16px',
                    color: '#344767',
                    fontWeight: '400',
                  }}
                >
                  {labels[hover !== -1 ? hover : value]}
                </MDTypography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',

              marginTop: '20px',
            }}
          >
            {show === 1 ? (
              <TextField
                id="outlined-multiline-static"
                multiline
                placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm..."
                sx={{ width: '100%' }} // Set TextField
                rows={10}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            ) : null}
          </Box>
          {show === 1 ? (
            <>
              <MDTypography
                display="block"
                sx={{
                  fontSize: '14px',
                  color: '#344767',
                  fontWeight: '400',
                  marginTop: '10px',
                  marginBottom: '8px',
                }}
              >
                Gửi hình chụp thực tế (tối đa 3 hình)
              </MDTypography>

              <Upload
                beforeUpload={() => {
                  return false;
                }}
                accept=".png, .jpeg, .jpg"
                fileList={fileList}
                onChange={handleChangeUpload}
                multiple={true}
                listType="picture-card"
              >
                {fileList.length >= 3 ? null : <PlusOutlined />}
              </Upload>
              {loading ? (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <CircularProgress color="dark" />
                </MDBox>
              ) : null}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
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
                  onClick={handleAddRating}
                >
                  Gửi đánh giá ngay
                </MDButton>
              </Box>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default ReviewModal;
