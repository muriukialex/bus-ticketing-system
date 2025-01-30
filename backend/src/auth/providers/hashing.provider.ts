export abstract class HashingProvider {
  /**
   * Abstract method defination to generate hashed password
   * @param data
   * @return string
   */
  abstract hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Abstract method defination to compare the user provided hashed password with the saved hashed password
   * @param data
   * @param hashedPassword
   */
  abstract comparePasswords(
    data: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean>;
}
