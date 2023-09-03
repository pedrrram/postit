'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

type LoggedProps = {
  image: string;
};

const Logged = ({ image }: LoggedProps) => {
  console.log(image);
  return (
    <div className="flex items-center space-x-3">
      <div onClick={() => signOut()} title="logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-zinc-950"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </div>
      <Link href="/dashboard" as={'/dashboard'}>
        <Image
          height={64}
          width={64}
          className="w-12 rounded-full"
          src={image}
          alt="user"
          priority
        />
      </Link>
    </div>
  );
};

export default Logged;
