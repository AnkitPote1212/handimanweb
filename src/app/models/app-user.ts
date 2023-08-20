export class AppUser {
    constructor(
        public firstName:string,
        public lastName:string,
        public email:string,
        public city:string,
        public password:string,
        public role:string='APP_USER' 
    ){}
}
