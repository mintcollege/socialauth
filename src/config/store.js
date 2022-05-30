import create from 'zustand'
import {persist} from "zustand/middleware";

let store = (set, get) => ({
    is_auth: false,
    // login: () => set(state => ({is_auth: true})),
    login: (user) => {
        set({is_auth: true})
        get().set_user(user)

        // const state = get()
        // state.set_user(user)

        // Do another thing
        // Send an email
        // Redirect to home page
        // ALL OF THE ABOVE
    },
    logout: () => {
        set({is_auth: false})
        get().set_user(null)
        // Redirect to login form
    },
    user: null,
    set_user: registereduser => set({user: registereduser})
})
store = persist(store, {name: 'sitedata'})
export const useStore = create(store)