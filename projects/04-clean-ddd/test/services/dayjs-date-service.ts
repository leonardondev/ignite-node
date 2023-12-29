import dayjs from 'dayjs'
import { DateService } from '@/domain/forum/application/services/date-service'

export class DayJsDateService implements DateService {
  diffInDays(refDate: Date, targetDate: Date) {
    return dayjs(refDate).diff(targetDate)
  }
}
