import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  login: string;
  displayName: string;
}

export class JwtService {
  constructor(private readonly secret: string) {}

  public sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "30d",
    });
  }

  public verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
