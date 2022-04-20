import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const router = useRouter();

	/* useEffect(() => {
		if(!loading && !session) {
			router.push('/login')
		}
	}, [loading, session]) */

  return (
    <Main
      meta={
        <Meta
          title="Nejoum Al Jazeera"
          description=""
        />
      }
    >
      
      <h1 className="text-2xl font-bold">
        Boilerplate code for your Nextjs project with Tailwind CSS
      </h1>
      <p>
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        Next.js Boilerplate is a starter code for your Next js project by
        putting developer experience first .{' '}
        <span role="img" aria-label="zap">
          ⚡️
        </span>{' '}
        Made with Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged,
        VSCode, Netlify, PostCSS, Tailwind CSS.
      </p>
      <h2 className="text-lg font-semibold">Next js Boilerplate Features</h2>
      <p>Developer experience first:</p>
    </Main>
  );
};

export default Index;