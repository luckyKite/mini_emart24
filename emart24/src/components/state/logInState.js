import { atom } from 'recoil';
import { recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const logInState = atom({
  key: 'logInState',
  default: {
    isLogIn: false,
    userId: '',
    email: '',
    name: '',
  },
  effects_UNSTABLE: [persistAtom]
});