export const isImageValid = (image: string | null): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!image) return resolve(false);

    const img = new Image();

    img.onload = () => {
      resolve(true);
    };

    img.onerror = () => {
      resolve(false);
    };

    img.src = image;
  });
};
