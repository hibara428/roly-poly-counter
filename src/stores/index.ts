import { CognitoCookieParser, type CognitoUser } from '@/utils/cognito'
import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  errors: string[]
  messages: string[]
  loginUser: CognitoUser | undefined
}

export const key: InjectionKey<Store<State>> = Symbol()

const isLocalDevEnv = () => window.location.host === 'localhost:5173'

export const store = createStore<State>({
  state: {
    errors: [],
    messages: [],
    loginUser: !isLocalDevEnv()
      ? new CognitoCookieParser().parse()
      : {
          idToken: '',
          payload: {},
          email: 'hibara428@gmail.com'
        }
  }
})
