import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

async function refreshAccessToken(token) {
  try {
    let refreshedTokens;

    await axios
      .post(`${process.env.API_URL}refresh`, {
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      })
      .then((response) => {
        refreshedTokens = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      expires_in: Date.now() + refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token
        ? refreshedTokens.refresh_token
        : "",
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const formData = {
          client_id: process.env.API_CLIENT_ID,
          client_secret: process.env.API_CLIENT_SECRET,
          primary_email: email,
          password,
          grant_type: "password",
        };
        let user = null;
        let profile = null;
        await axios
          .post(`${process.env.API_URL}login`, formData)
          .then((response) => {
            user = response.data;
          })
          .catch((error) => {
            // const errorMessage = e.response.data.message
            // throw new Error(errorMessage + '&email=' + credentials.email)
            console.error("Error:", error);
          });
        if (user) {
          axios.defaults.headers.common.Authorization = `Bearer ${user?.access_token}`;
          await axios
            .get(`${process.env.API_URL}profile`)
            .then((response) => {
              profile = response.data;
              user.profile = profile.data;
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
      session.profile = token.profile;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.expires_in = Date.now() + user.expires_in;
        token.refresh_token = user.refresh_token;
        token.profile = user.profile;
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
};

export default (req, res) => NextAuth(req, res, options);
