import React, { useState, useEffect, useCallback } from 'react';
import MDButton from '../../components/MDButton';
import MDTypography from '../../components/MDTypography';
import MDBox from '../../components/MDBox';
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  Stack,
  DialogContent,
  List,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { formatThousand } from '../../utils/custom-price';

const ServiceModal = ({
  open,
  serviceId,
  setServiceId,
  setServiceName,
  setServiceTypeId,
  setOpen,
  listService,
  setShipAmount,
  setFreeShip,
  percent,
  setTotalAmount,
  totalPrice,
  setEstimatedDeliveryDate,
}) => {
  const [serviceIdSelected, setServiceIdSelected] = useState(serviceId);
  const [loading, setLoading] = useState(true);
  const handleServiceClick = (id) => {
    // const { service_id, short_name, service_type_id } = item;
    setServiceIdSelected(id);
  };
  const handleClose = () => {
    setOpen(false);

    setServiceIdSelected(serviceId);
  };
  const handleSetService = () => {
    const selectedService = listService.find(
      (item) => item.service_id === serviceIdSelected
    );

    if (selectedService) {
      const {
        service_id,
        fromTime,
        toTime,
        short_name,
        shipFee,
        service_type_id,
      } = selectedService;
      setServiceName(short_name);
      setServiceId(service_id);
      setServiceTypeId(service_type_id);
      setShipAmount(shipFee);
      const freeShipPrice = ~~((percent * shipFee) / 100);
      setFreeShip(freeShipPrice);
      setTotalAmount(shipFee + totalPrice - freeShipPrice);
      setEstimatedDeliveryDate(`Delivery on ${fromTime} - ${toTime}`);
      setOpen(false);
    }
  };
  useEffect(() => {
    console.log(listService);
    if (serviceId && Object.keys(listService).length > 0) {
      setLoading(false);
      setServiceIdSelected(serviceId);
    }
  }, [serviceId, listService]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 'none' } }}
    >
      <DialogTitle>Select shipping method</DialogTitle>
      <DialogContent>
        {loading ? (
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <CircularProgress />
          </MDBox>
        ) : (
          <>
            <List sx={{ width: '100%', overflow: 'auto' }}>
              {Object.keys(listService).length > 0
                ? listService.map((item, index) => {
                    return (
                      <MDBox
                        key={index}
                        type="button"
                        onClick={() => handleServiceClick(item.service_id)}
                        sx={{
                          p: 2,
                          backgroundColor: '#eeeeee',
                          marginBottom: '5px',
                          borderRadius: '10px',
                          border:
                            serviceIdSelected === item.service_id
                              ? '2px solid'
                              : 'none',
                          borderColor:
                            serviceIdSelected === item.service_id
                              ? 'primary.main'
                              : 'transparent',
                          boxShadow:
                            serviceIdSelected === item.service_id
                              ? '0px 0px 5px rgba(0, 0, 0, 0.3)'
                              : 'none',
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                        >
                          <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                          >
                            <Stack
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center"
                              spacing={1}
                            >
                              <MDTypography
                                color="primary"
                                sx={{
                                  fontSize: '14px',
                                  textTransform: 'uppercase',
                                  marginRight: '30px',
                                }}
                                variant="h4"
                              >
                                E-COMMERCE DELIVERY
                              </MDTypography>
                              <MDTypography
                                color="dark"
                                sx={{ fontSize: '14px', fontWeight: '500' }}
                              >
                                {formatThousand(item.shipFee)}đ{' '}
                              </MDTypography>
                            </Stack>
                            <MDTypography
                              color="dark"
                              sx={{ fontSize: '12px', fontWeight: '400' }}
                            >
                              {`Delivery on ${item.fromTime} - ${item.toTime}`}
                            </MDTypography>
                          </Stack>
                          {serviceIdSelected === item.service_id ? (
                            <Stack direction="row" justifyContent="flex-end">
                              <CheckIcon color="primary" />
                            </Stack>
                          ) : null}
                        </Stack>
                      </MDBox>
                    );
                  })
                : null}
            </List>
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <MDButton
                size="medium"
                color="dark"
                sx={{
                  textTransform: 'initial !important',
                  fontWeight: '500',
                }}
                variant="outlined"
                onClick={handleClose}
                style={{ marginRight: '8px', padding: '10px' }}
              >
                Back
              </MDButton>
              <MDButton
                size="medium"
                color="success"
                sx={{
                  textTransform: 'initial !important',
                  fontWeight: '500',
                  padding: '10px',
                }}
                variant="contained"
                onClick={handleSetService}
              >
                Finish
              </MDButton>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
