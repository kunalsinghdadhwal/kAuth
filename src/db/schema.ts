import { pgTable, text, timestamp, boolean, integer, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	twoFactorEnabled: boolean('two_factor_enabled')
}, (table) => ([
	index('users_email_index').on(table.email),
]));

export const session = pgTable("session", {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' })
}, (table) => ([
	index('session_user_id_index').on(table.userId),
	index('session_token_index').on(table.token),
]));

export const account = pgTable("account", {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
}, (table) => ([
	index('account_user_id_index').on(table.userId),
]));

export const verification = pgTable("verification", {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
}, (table) => ([
	index('verification_identifier_index').on(table.identifier),
]));

export const twoFactor = pgTable("two_factor", {
	id: text('id').primaryKey(),
	secret: text('secret').notNull(),
	backupCodes: text('backup_codes').notNull(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' })
}, (table) => ([
	index('two_factor_secret_index').on(table.secret),
]));

export const passkey = pgTable("passkey", {
	id: text('id').primaryKey(),
	name: text('name'),
	publicKey: text('public_key').notNull(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	credentialID: text('credential_i_d').notNull(),
	counter: integer('counter').notNull(),
	deviceType: text('device_type').notNull(),
	backedUp: boolean('backed_up').notNull(),
	transports: text('transports'),
	createdAt: timestamp('created_at')
}, (table) => ([
	index('passkey_user_id_index').on(table.userId),
]));

