import { atom, selector } from 'recoil';
import { PricingPackage } from '../../features/admin/PriceManager';
import { PostType } from '../../features/blog/Blog';

interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  exp: number; 
}

export const userInfoState = atom<UserInfo | null>({
  key: 'userInfoState',
  default: null,
});

export const isLoggedInState = selector({
  key: 'isLoggedInState',
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    return userInfo !== null && new Date().getTime() < userInfo.exp * 1000;
  },
});

export const userNameState = selector({
  key: 'userNameState',
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    return userInfo ? userInfo.name : '';
  },
});

export const pricingPackagesState = atom<PricingPackage[]>({
  key: 'pricingPackagesState',
  default: [],
});

export const blogPostsState = atom<PostType[]>({
  key: 'blogPostsState',
  default: [],
});
