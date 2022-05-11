declare module 'next-auth' {
  interface Session {
    user?:
      | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
        }
      | undefined;
    expires: string;
    token?: {
      access_token: string;
      expires_in: string;
      expires_in: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {}
}
