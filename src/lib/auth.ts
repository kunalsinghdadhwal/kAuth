import { betterAuth, BetterAuthOptions } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { captcha, haveIBeenPwned, magicLink, openAPI, twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { db } from "@/db";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in environment variables");
}

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set in environment variables");
}

if (!process.env.TURNSTILE_SECRET_KEY) {
    throw new Error("TURNSTILE_SECRET_KEY must be set in environment variables");
}


export const auth = betterAuth({
    appName: "KAuth",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema
        }
    }),
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 60 * 60,
        // sendVerificationEmail: 
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        // sendResetPassword:
        resetPasswordTokenExpiresIn: 60 * 60,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },
    user: {
        modelName: "users",
        deleteUser: {
            enabled: true,
            // sendDeleteAccountVerification
        }
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github", "email-password"],
            allowDifferentEmails: true,
        }
    },
    verification: {
        disableCleanup: false
    },
    advanced: {
        ipAddress: {
            disableIpTracking: false
        },
        useSecureCookies: true,
        disableCSRFCheck: false,
        defaultCookieAttributes: {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        },
        cookiePrefix: "KAUTH_",
    },
    plugins: [
        openAPI(),
        nextCookies(),
        twoFactor(),
        haveIBeenPwned({
            customPasswordCompromisedMessage: "Password found in data breach, Use a more secure password"
        }),
        magicLink({
            sendMagicLink: async ({ email, token }) => { }
        }),
        captcha({
            provider: "cloudflare-turnstile",
            secretKey: process.env.TURNSTILE_SECRET_KEY as string,
        }),
        passkey({
            rpID: "localhost",
            rpName: "KAuth",
            origin: "http://localhost:3000",
            authenticatorSelection: {
                residentKey: "required",
                userVerification: "required"
            }
        })
    ]
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;