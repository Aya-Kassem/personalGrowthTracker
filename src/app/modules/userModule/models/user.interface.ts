export interface UserProfileInfo {
    name: string,
    title: string,
    company: string,
    contractType: string,
    img: string,
    email: string,
    github?: string,
    linkedin?: string,
}


export interface CurrentUser {
    token: string,
    email: string,
    uid: string
}