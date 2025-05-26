import { createAuthClient } from "better-auth/client";
import { twoFactorClient, magicLinkClient, passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    plugins: [
        twoFactorClient({
            onTwoFactorRedirect() {
                window.location.href = "/two-factor";
            }
        }),
        magicLinkClient(),
        passkeyClient()
    ]
})
