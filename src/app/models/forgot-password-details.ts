export class ForgotPasswordDetails {
  constructor(
    public registeredEmail: string,
    public pin: string,
    public password: string
  ) {}
}
