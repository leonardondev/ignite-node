import { DateService } from '@/domain/forum/application/services/date-service'
import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

@Injectable()
export class DayJsDateService implements DateService {
  diffInDays(refDate: Date, targetDate: Date) {
    return dayjs(refDate).diff(targetDate)
  }
}
