export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public age: number,
    public email: string,
    private _token: string,
    private _EXPDate: Date
  ) {}

  get token() {
    if (!this._EXPDate || new Date() > this._EXPDate) {
      return null;
    }
    return this._token;
  }
}
