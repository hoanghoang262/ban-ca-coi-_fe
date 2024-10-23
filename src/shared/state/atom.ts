import { atom, selector } from 'recoil';
import { PricingPackage } from '../../features/admin/PriceManager';

interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  exp: number; 
}

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
});

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

export interface ContentItem {
  contentId: number;
  createdBy: number;
  createByName: string;
  title: string;
  content: string;
  contentType: string;
  image: string;
  createdAt: string;
  updatedAt: string | null;
}

export const blogPostsState = atom<ContentItem[]>({
  key: 'blogPostsState',
  default: [],
});

export const blogDataState = atom<ContentItem[]>({
  key: 'blogDataState',
  default: [],
});

export interface OrderStatus {
  name: string;
  value: number;
}

export interface Order {
  orderId: number;
  customerId: number;
  customerName: string | null;
  pickupLocation: string;
  destination: string;
  weight: number;
  quantity: number;
  transportMethod: string;
  total: number | null;
  additionalServices: string;
  pricingId: number;
  pricingDetails: any | null;
  status: string;
  placedDate: string;
  completedDate: string | null;
}

export const orderStatusesState = atom<OrderStatus[]>({
  key: 'orderStatusesState',
  default: [],
});

export const customerOrdersState = atom<Order[]>({
  key: 'customerOrdersState',
  default: [],
});
