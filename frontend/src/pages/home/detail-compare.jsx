import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MDBox from '../../components/MDBox';

const detailsKeys = [
  'screen',
  'os',
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
  os: 'Hệ điều hành',
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
          {detailsKeys.map((key) => (
            <TableRow key={key}>
              <TableCell>{detailsTitles[key]}</TableCell>
              {products.map((product, index) => (
                <TableCell key={index}>
                  {key === 'ram' || key === 'storage'
                    ? product[key] // Accessing directly for 'ram' and 'storage'
                    : product.detailsProduct[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MDBox>
  );
};

export default DetailProductItem;
