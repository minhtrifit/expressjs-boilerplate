export enum UploadError {
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  FILES_NOT_FOUND = 'FILES_NOT_FOUND'
}

export const uploadService = {
  buildFile(id: string, name: string, baseUrl: string, file: Express.Multer.File | undefined) {
    if (!file) throw new Error(UploadError.FILE_NOT_FOUND);

    const fileUrl = `${baseUrl}/uploads/${file.filename}`;

    return {
      id,
      name,
      file: {
        originalName: file.originalname,
        fileName: file.filename,
        size: file.size,
        mimeType: file.mimetype,
        url: fileUrl
      }
    };
  },

  buildFiles(baseUrl: string, files: Express.Multer.File[]) {
    if (!files || files.length === 0) throw new Error(UploadError.FILES_NOT_FOUND);

    return files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename,
      size: file.size,
      mimeType: file.mimetype,
      url: `${baseUrl}/uploads/${file.filename}`
    }));
  }
};
