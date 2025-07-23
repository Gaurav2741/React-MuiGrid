// Convert a File to Base64 using callback
export const fileToBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.onerror = (error) => {
    alert('Load Error: ' + error);
  };
  reader.readAsDataURL(file);
};

// Convert a Blob or binary data to Base64 using callback
export const blobToBase64 = (blob, callback) => {
  // If it's already a base64 string
  if (typeof blob === 'string' && blob.startsWith('data:')) {
    callback(blob);
    return;
  }

  try {
    const actualBlob = new Blob([blob], { type: 'image/*' });
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.onerror = (error) => {
      console.error('Blob to Base64 conversion error:', error);
      callback('');
    };
    reader.readAsDataURL(actualBlob);
  } catch (err) {
    console.error('Error in blobToBase64:', err);
    callback('');
  }
};

// Format date to YYYY-MM-DD
export const toDateStr = (dt) => {
  const m = dt.getMonth() + 1;
  const d = dt.getDate();
  return dt.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
};
