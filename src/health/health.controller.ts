import { Controller, Get } from '@nestjs/common'
import { DNSHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private dns: DNSHealthIndicator) {}

  @Get()
  @HealthCheck()
  checkDNS() {
    return this.health.check([() => this.dns.pingCheck('dns', 'https://google.com')])
  }
}
