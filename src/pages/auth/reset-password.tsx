import AuthRecoverPassword from 'features/Auth/RecoverPassword/RecoverPassword';
import Layout from 'layouts/Full';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSingle } from 'utils/types';

const SignUpPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <Layout title="Sign In">
      <AuthRecoverPassword callbackUrl={query.callbackUrl ? getSingle(query.callbackUrl) : '/auth/signin'} />
    </Layout>
  );
};

export default SignUpPage;