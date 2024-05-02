export abstract class DateService {
  abstract diffInDays(refDate: Date, targetDate: Date): number
}
