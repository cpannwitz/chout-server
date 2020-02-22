import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

// TODO: add redis as memorystorage

export default () => ({
  fileUpload: {
    limits: {
      fieldSize: 5 * 1024 * 1024,
      fileSize: 5 * 1024 * 1024
    }
  } as MulterOptions
})
