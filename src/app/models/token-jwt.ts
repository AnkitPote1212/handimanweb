import { User } from "./user";

export class TokenJwt {
    public constructor(
        public jwtToken:string,
        public username:string,
        public user:User
    ){}
}
