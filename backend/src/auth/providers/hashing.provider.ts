export abstract class HashingProvider {
  /**
   * Abstract method definition to generate hashes password
   * @param data
   * @return string
   */
  abstract hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Abstract method definition to compare the user provided password with the saved hashed password
   * @param data
   * @param hashedPassword
   */
  abstract comparePasswords(
    data: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean>;
}
