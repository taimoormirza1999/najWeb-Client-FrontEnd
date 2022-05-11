import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const formData = new URLSearchParams({
          client_id: process.env.API_CLIENT_ID,
          client_secret: process.env.API_CLIENT_SECRET,
          primary_email: email,
          password,
          grant_type: "password",
        });

        let user = null;
        let profile = null;
        await fetch(`${process.env.API_URL}login`, {
          method: "POST",
          body: formData,
          redirect: "follow",
        })
          .then(response => response.text())
          .then(data => {
            data = JSON.parse(data);

            if (data.access_token) {
              user = data;
            }
          })
          .catch((error) => {
            // const errorMessage = e.response.data.message
            // throw new Error(errorMessage + '&email=' + credentials.email)
            console.error("Error:", error);
          });
        if (user) {
          axios.defaults.headers.common.Authorization = `Bearer ${user?.access_token}`;
          await axios
            .post(`${process.env.API_URL}profile`)
            .then((response) => {
              profile = response.data;
              console.log(profile);
            })
            .catch((error) => {
              // const errorMessage = e.response.data.message
              // throw new Error(errorMessage + '&email=' + credentials.email)
              console.error("Error:", error);
            });
        }
        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.token = token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.expires_in = Date.now() + user.expires_in * 1000;
        token.refresh_token = user.refresh_token;
        return token;
      }

      if (Date.now() < token.expires_in) {
        return token;
      }

      return refreshAccessToken(token);
    },
  },
  pages: {
    signIn: "/login",
  },
}

async function refreshAccessToken(token) {
  try {
    const url =`${process.env.API_URL}refresh`;

    const formData = new URLSearchParams({
      client_id: process.env.API_CLIENT_ID,
      client_secret: process.env.API_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    });
    const response = await fetch(url, {
      body:formData,
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      expires_in: Date.now() + refreshedTokens.expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default (req, res) => NextAuth(req, res, options);
