export abstract class HashValidator {
  abstract compare(plain: string, hashed: string): Promise<boolean>
}
