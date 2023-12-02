import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MDTypography from '../../components/MDTypography';
import MDBox from '../../components/MDBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { withStyles } from '@mui/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const detailsKeys = [
  'screen',
  'OS',
  'backCamera',
  'frontCamera',
  'cpu',
  'ram',
  'storage',
  'sim',
  'batteryPowerAndCharger',
];
const detailsTitles = {
  screen: 'Màn hình',
  OS: 'Hệ điều hành',
  backCamera: 'Camera sau',
  frontCamera: 'Camera trước',
  cpu: 'Chip',
  ram: 'RAM',
  storage: 'Dung lượng lưu trữ',
  sim: 'SIM',
  batteryPowerAndCharger: 'Pin, Sạc',
};
const DetailProductItem = (props) => {
  const { products } = props;
  return (
    <MDBox variant="contained" sx={{ border: '8px', paddingBottom: '30px' }}>
      <Table>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell sx={{ fontWeight: '600' }}>
              Thông số
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: '600' }}>
              {products[0].name}
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: '600' }}>
              {products[1].name}
            </StyledTableCell>
            {products.length === 3 ? (
              <StyledTableCell sx={{ fontWeight: '600' }}>
                {products[2].name}
              </StyledTableCell>
            ) : null}
          </StyledTableRow>
          {detailsKeys.map((key) => (
            <StyledTableRow key={key}>
              <StyledTableCell>{detailsTitles[key]}</StyledTableCell>
              <StyledTableCell>
                {products[0].detailsProduct[key]}
              </StyledTableCell>
              <StyledTableCell>
                {products[1].detailsProduct[key]}
              </StyledTableCell>
              {products.length === 3 ? (
                <StyledTableCell>
                  {products[2].detailsProduct[key]}
                </StyledTableCell>
              ) : null}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </MDBox>
  );
};

export default DetailProductItem;
