const typePhone = [
  {
    name: 'iOS',
  },
  {
    name: 'Android',
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
    key: 'Nổi bật',
    name: 'Nổi bật',
    value: 2,
  },
  {
    key: '% giảm',
    name: '% giảm',
    value: 0,
  },
  {
    key: 'Giá giảm dần',
    name: 'Giá giảm dần',
    value: -1,
  },
  {
    key: 'Giá tăng dần',
    name: 'Giá tăng dần',
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
