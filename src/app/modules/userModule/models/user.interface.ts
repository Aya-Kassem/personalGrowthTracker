export interface UserProfileInfo {
  name: string;
  title: string;
  company: string;
  contractType: string;
  img: string;
  email: string;
  github?: string;
  linkedin?: string;
  joinDate: string;
}

export interface CurrentUser {
  email: string;
  uid: string;
}

export const defaultUserProfile = () => {
  return {
    name: '',
    title: '',
    company: '',
    contractType: '',
    img: '',
    email: '',
    github: '',
    linkedin: '',
    joinDate: ''
  };
};
