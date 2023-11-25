import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OrderListContent from './order-tab-custom.jsx';
import MDBox from '../../components/MDBox/index.js';
const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: '10px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const { loading, indexSelected, orderList, setIndexSelected } = props;
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setIndexSelected(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} style={{ paddingTop: '0px' }}>
        <MDBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={indexSelected}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab
              label="All"
              {...a11yProps(0)}
              sx={{
                textTransform: 'initial !important',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
            <Tab
              label="Pending"
              {...a11yProps(1)}
              sx={{
                textTransform: 'initial !important',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
            <Tab
              label="Packed"
              {...a11yProps(2)}
              sx={{
                textTransform: 'initial !important',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
            <Tab
              label="Delivery"
              {...a11yProps(3)}
              sx={{
                textTransform: 'initial !important',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
            <Tab
              label="Completed"
              {...a11yProps(4)}
              sx={{
                textTransform: 'initial !important',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
            <Tab
              label="Cancelled"
              {...a11yProps(5)}
              sx={{
                textTransform: 'initial !important',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
            <Tab
              label="Refund"
              {...a11yProps(6)}
              sx={{
                textTransform: 'initial !important',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
          </Tabs>
        </MDBox>
        <TabPanel value={indexSelected} index={0} sx={{ paddingTop: '0px' }}>
          <OrderListContent orderList={orderList} type="all" />
        </TabPanel>
        <TabPanel value={indexSelected} index={1}>
          <OrderListContent orderList={orderList} type="pending" />
        </TabPanel>
        <TabPanel value={indexSelected} index={2}>
          <OrderListContent orderList={orderList} type="packed" />
        </TabPanel>

        <TabPanel value={indexSelected} index={3}>
          <OrderListContent orderList={orderList} type="shipping" />
        </TabPanel>
        <TabPanel value={indexSelected} index={4}>
          <OrderListContent orderList={orderList} type="delivered" />
        </TabPanel>
        <TabPanel value={indexSelected} index={5}>
          <OrderListContent orderList={orderList} type="cancelled" />
        </TabPanel>
        <TabPanel value={indexSelected} index={6}>
          <OrderListContent orderList={orderList} type="refund" />
        </TabPanel>
      </div>
    </ThemeProvider>
  );
}
