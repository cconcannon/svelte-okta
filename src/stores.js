import { readable, writable, derived } from 'svelte/store';
import oktaAuth from './oktaAuth';

export const authState = readable(oktaAuth.authStateManager.getAuthState(), set => {
    oktaAuth.authStateManager.subscribe(as => {
        set(as);
    })

    return () => { };
})

export const user = derived(
    authState,
    ($authState, set) => {
        if ($authState && $authState.isAuthenticated) {
            set({
                name: $authState.idToken.claims.name,
                email: $authState.idToken.claims.email,
                accessToken: $authState.accessToken,
                loggedIn: true
            })
        } else {
            set({
                loggedIn: false
            })
        }
    }
)

export const registrationInProgress = writable(false);