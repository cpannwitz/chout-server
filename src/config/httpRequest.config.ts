import { HttpModuleOptions } from '@nestjs/common'

// TODO: add more specific config for axios

export default () => ({
  httpRequest: {
    timeout: 5000,
    maxRedirects: 5
  } as HttpModuleOptions
})
