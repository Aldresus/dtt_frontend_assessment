export const utils = {
  formatPrice(price) {
    // add . between thousands
    if (!price) return;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};
