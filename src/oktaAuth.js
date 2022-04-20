import { OktaAuth } from "@okta/okta-auth-js";

const oktaConfig = {
    issuer: "https://{your-okta-domain}/oauth2/default",
    clientId: "{your-client-id}",
    redirectUri: "http://localhost:8080",
    scopes: ["openid"],
    pkce: true,
    tokenManager: {
        storage: "localStorage"
    }
}

const authClient = new OktaAuth(oktaConfig);

export default authClient;