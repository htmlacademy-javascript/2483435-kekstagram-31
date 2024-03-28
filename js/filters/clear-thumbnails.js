export const clearThumbnails = () => {

  const container = document.querySelector('.pictures');

  Array.prototype.slice
    .call(container.getElementsByTagName('a'))
    .forEach((item) => {
      item.remove();
    });

};
