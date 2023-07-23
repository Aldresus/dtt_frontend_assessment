export const utils = {
  formatPrice(price) {
    // add . between thousands
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};
