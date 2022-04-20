import { OktaAuth } from "@okta/okta-auth-js";

const oktaConfig = {
    issuer: "https://dev-96267728.okta.com/oauth2/default",
    clientId: "0oa4qm5rzvCU7fvwz5d7",
    redirectUri: "http://localhost:8080",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    tokenManager: {
        storage: "localStorage"
    }
}

const authClient = new OktaAuth(oktaConfig);

export default authClient;