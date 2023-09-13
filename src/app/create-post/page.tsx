import CreatePostForm from '@/components/posts/CreatePostForm';

const CreatePost = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-5 text-xl font-light">Create new post</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
