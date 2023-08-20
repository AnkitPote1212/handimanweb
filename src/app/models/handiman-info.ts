export class HandimanInfo {
  public constructor(
    public firstName: string,
    public lastName: string,
    public city: string,
    public serviceProvided: string,
    public experiance: string,
    public contactNumber: number,
    public email: string,
    public profileImage: string,
    public aboutMe?: string,
    public resumeUrl?: string
  ) {}
}
