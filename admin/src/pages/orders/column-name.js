const paymentStatusList = [
    {
        name: 'Unpaid',
        value: 'pending',
        color: '#5ba6a6',
    },
    {
        name: 'Paid',
        value: 'completed',
        color: '#b6d7a8',
    },
    {
        name: 'Cancel order',
        value: 'cancelled',
        color: '#ea9999',
    },
    {
        name: 'Refunded',
        value: 'refund',
        color: '#b4a7d6',
    },
];
const orderStatusList = [
    {
        key: 'pending',
        value: 'Waiting for confirmation',
        color: '#5ba6a6',
    },
    {
        key: 'packed',
        value: 'Packaged',
        color: '#6fa8dc',
    },
    {
        key: 'shipping',
        value: 'Delivery',
        color: '#ffe599',
    },
    {
        key: 'delivered',
        value: 'Delivered',
        color: '#b6d7a8',
    },
    {
        key: 'cancelled',
        value: 'Canceled',
        color: '#ea9999',
    },
    {
        key: 'refund',
        value: 'Return',
        color: '#b4a7d6',
    },
];


module.exports = {
    paymentStatusList,
    orderStatusList,
}