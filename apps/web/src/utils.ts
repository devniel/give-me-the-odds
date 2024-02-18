export const readFileAsJson = <T>(file: File): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result;
      try {
        if (typeof text === "string") {
          const json: T = JSON.parse(text);
          resolve(json);
        }else{
          reject(new Error('Invalid file.'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};
