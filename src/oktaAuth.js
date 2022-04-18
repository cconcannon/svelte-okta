import { OktaAuth } from "@okta/okta-auth-js";

const oktaConfig = {
    issuer: "https://oie-1918532.oktapreview.com/oauth2/default",
    clientId: "0oa3gx4qjzcLNoqWa1d7",
    redirectUri: "http://localhost:8080",
    scopes: ["openid", "profile"],
    tokenManager: {
        storage: "sessionStorage"
    }
}

const authClient = new OktaAuth(oktaConfig);

export { authClient };