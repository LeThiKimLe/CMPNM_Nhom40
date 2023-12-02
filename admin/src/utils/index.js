export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const formatThousand = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
export const getListProductSold = (products) => {
  let newListProduct = [];
  products.map((item, index) => {
    if (item.quantitySold > 0) {
      newListProduct.push(item);
    }
  });
  console.log('new list product sold');
  return newListProduct;
};
export * from './private-component';
