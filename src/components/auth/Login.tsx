'use client';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <button
      onClick={async () =>  await signIn()}
      className="rounded-xl bg-zinc-950 text-white px-4 py-2 cursor-pointer disabled:opacity-25"
    >
      Login
    </button>
  );
};

export default Login;
