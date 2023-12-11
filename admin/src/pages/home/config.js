export const StockProductColumns = [
  {
    title: 'Product name',
    dataIndex: 'name',
    key: 'name',
    width: '32%',
  },
  {
    title: 'Sold quantity',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Warehouse quantity',
    key: 'stock',
    dataIndex: 'stock',
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price',
  },
];

export const RecentOrderColumns = [
  {
    title: 'Single code',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Product quantity',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Payment Status',
    key: 'paymentStatus',
    dataIndex: 'paymentStatus',
  },
  {
    title: 'Single status',
    key: 'orderStatus',
    dataIndex: 'orderStatus',
  },
  {
    title: 'Total amount',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
];
export const paymentStatusList = [
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
export const orderStatusList = [
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
export const eChartConfig = {
  series: [
    {
      name: 'Sales',
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500, 200, 400, 300],
      color: '#fff',
    },
  ],

  options: {
    chart: {
      type: 'bar',
      width: '100%',
      height: 'auto',

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      borderColor: '#ccc',
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  },
};
export const monthNamesEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthNamesVi = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
