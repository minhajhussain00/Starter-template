import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { svelteCookies } from "./auth-svelte-cookies";
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"
import { PRIVATE_MONGODB_URI, PRIVATE_STRIPE_SECRET_KEY, PRIVATE_STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import { dbName } from "./constant";
import { sendVerificationEmail } from "./email/emails";

const stripeClient = new Stripe(PRIVATE_STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
})

const client = new MongoClient(`${PRIVATE_MONGODB_URI}/${dbName}`);
const db = client.db();     

console.log("Connected to MongoDB");
export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			console.log(`Send reset password email for ${user.email} url ${url}`);
		}
    },

    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendVerificationEmail(user.email, url, token);
        }
        
    },
    plugins: [
        svelteCookies(),
        stripe({
            stripeClient,
            stripeWebhookSecret: PRIVATE_STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
        }),
        
    ],
    user: {
        additionalFields: {
            firstName: {
                type: "string",
                required: true,
            },
            lastName: {
                type: "string",
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
                input: false,
            }
        }
    }
});

