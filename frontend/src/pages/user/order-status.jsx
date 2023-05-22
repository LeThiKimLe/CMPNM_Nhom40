import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Stepper, Stack, Step, StepLabel } from '@mui/material';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import {
  faTruckFast,
  faBoxArchive,
  faTriangleExclamation,
  faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import MDTypography from '../../components/MDTypography';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));
const orderStatusList = [
  {
    key: 'pending',
    value: 'Chờ xác nhận',
    icon: <WorkHistoryIcon />,
  },
  {
    key: 'packed',
    value: 'Đã đóng gói',
    icon: <FontAwesomeIcon icon={faBoxArchive} />,
  },
  {
    key: 'shipping',
    value: 'Đang giao hàng',
    icon: <FontAwesomeIcon icon={faTruckFast} />,
  },
  {
    key: 'delivered',
    value: 'Đã giao hàng',
    icon: <AssignmentTurnedInIcon />,
  },
  {
    key: 'cancelled',
    value: 'Đã hủy',
    icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
  },
  {
    key: 'refund',
    value: 'Trả hàng',
    icon: <FontAwesomeIcon icon={faHandHoldingDollar} />,
  },
];
export default function CustomizedSteppers(props) {
  const { stepActive, orderStatus } = props;
  let icons = {};
  let steps = [];
  orderStatusList.map((item) => {
    for (let i = 0; i < orderStatus.length; i++) {
      if (item.key === orderStatus[i].type) {
        icons[i + 1] = item.icon;
        steps.push(item.value);
      }
    }
  });
  console.log(icons, steps);
  const ColorlibStepIcon = (props) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };
  return (
    <>
      <Stepper
        sx={{ backgroundImage: 'none', backgroundColor: '#ffffff' }}
        alternativeLabel
        activeStep={stepActive}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <MDTypography
                sx={{
                  color: stepActive === index ? '#e91e63' : '#111111',
                  fontSize: '12px',
                  fontWeight: stepActive === index ? '500' : '400',
                }}
              >
                {label}
              </MDTypography>
            </StepLabel>
          </Step>
        ))}
    
      </Stepper>
    </>
  );
}
