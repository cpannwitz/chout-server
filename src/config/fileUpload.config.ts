import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'fileUpload',
  () =>
    ({
      limits: {
        fieldSize: 5 * 1024 * 1024,
        fileSize: 5 * 1024 * 1024
      }
    } as MulterOptions)
)
