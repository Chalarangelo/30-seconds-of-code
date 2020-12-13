import { shape, string, arrayOf } from 'prop-types';

export default shape({
  orders: arrayOf(
    shape({
      url: string,
      title: string,
    })
  ),
  selectedOrder: string,
});
