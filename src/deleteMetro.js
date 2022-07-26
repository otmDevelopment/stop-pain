export const deleteAllOptions = () => {
    const metroSelect = document.querySelectorAll(".metroOption");
    metroSelect.forEach((item) => {
      item.remove();
    });
  };