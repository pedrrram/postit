import Login from './Login';
import Link from 'next/link';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import Logged from './Logged';

const Nav = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-between items-center py-5 border-b border-dashed border-zinc-400 mb-5">
      <div className="flex items-center space-x-3">
        <Link href={'/'}>
          <h1 className="text-2xl font-bold">Postit</h1>
        </Link>
        <Link href={'/create-post'}>
          <span className="cursor-pointer">Create</span>
        </Link>
      </div>
      {!session?.user ? (
        <Login />
      ) : (
        <Logged image={session.user?.image || ''} />
      )}
    </div>
  );
};

export default Nav;
