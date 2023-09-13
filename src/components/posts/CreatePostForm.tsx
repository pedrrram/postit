'use client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

const CreatePostForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  let [toastPostId, setToastPostId] = useState<string>();

  const createPost = async (data: { title: string }) => {
    await axios.post('/api/posts/addPost', data);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createPost,
    mutationKey: ['create-post', title],
    onSuccess: () => {
      toast.success('Post has been made...🔥', { id: toastPostId });
      setTitle('');
      router.push('/')
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message, { id: toastPostId });
      }
    },
  });

  const createHandler = async (e: FormEvent) => {
    e.preventDefault();
    setToastPostId(toast.loading('Creating your post', { id: toastPostId }));
    await mutateAsync({ title });
  };

  return (
    <form className="flex flex-col items-center" onSubmit={createHandler}>
      <textarea
        className="outline-none border p-2 h-40 w-[344px] resize-none rounded-md"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Waht's on your mind?"
        maxLength={300}
      ></textarea>
      <span
        className={`text-sm  block mt-1 ${
          title.length === 300 ? 'text-rose-600' : 'text-zinc-400'
        }`}
      >
        {title.length}/300
      </span>
      <button
        disabled={isLoading}
        className="bg-zinc-950 text-white px-4 py-2 rounded-xl w-min block mt-3 disabled:bg-zinc-600"
      >
        Create
      </button>
    </form>
  );
};

export default CreatePostForm;
