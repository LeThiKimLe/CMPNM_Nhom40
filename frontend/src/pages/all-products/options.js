const typePhone = [
  {
    value: 'iOS',
  },
  {
    value: 'Android',
  },
];
const rams = [
  {
    value: '2GB',
  },
  {
    value: '3GB',
  },
  {
    value: '4GB',
  },
  {
    value: '6GB',
  },
  {
    value: '8GB',
  },
  {
    value: '12GB',
  },
];
const storages = [
  {
    value: '32GB',
  },
  {
    value: '64GB',
  },
  {
    value: '128GB',
  },
  {
    value: '256GB',
  },
  {
    value: '512GB',
  },
  {
    value: '1TB',
  },
];
const sortOptions = [
  {
    key: 'Featured',
    name: 'Featured',
    value: 2,
  },
  {
    key: '% reduction',
    name: '% reduction',
    value: 0,
  },
  {
    key: 'Price decreasing',
    name: 'Price decreasing',
    value: -1,
  },
  {
    key: 'Price increasing',
    name: 'Price increasing',
    value: 1,
  },
];

const optionFilter = {
  typePhone,
  rams,
  storages,
  sortOptions,
};

export default optionFilter;
