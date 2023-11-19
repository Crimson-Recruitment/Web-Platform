export function checkImageSize(base64String: string): void {
  const maxTotalSizeInBytes = 2 * 1024 * 1024;
  const base64Data = base64String.split(",")[1];
  // Calculate the size of the image
  const binaryString = atob(base64Data);

  // Create a Uint8Array from the binary data
  const binaryData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    binaryData[i] = binaryString.charCodeAt(i);
  }
  if (binaryData.length > maxTotalSizeInBytes) {
    throw new Error("Profile image Size exceeds 2 megabytes.");
  }
}

export function checkDocumentSize(document: File): void {
  const maxTotalSizeInBytes = 2 * 1024 * 1024; // 2 megabytes

  const documentSize = document.size;

  // Calculate the total size
  const totalSize = documentSize;

  // Check if the total size exceeds the limit
  if (totalSize > maxTotalSizeInBytes) {
    throw new Error("Resume size exceeds 2 megabytes.");
  }
}
