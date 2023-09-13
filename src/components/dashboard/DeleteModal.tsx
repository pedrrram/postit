type DeleteModalProps = {
  setToggle: (status: boolean) => void;
  deletePost: () => void;
};

const DeleteModal = ({ setToggle, deletePost }: DeleteModalProps) => {
  return (
    <div className="fixed min-h-screen w-screen bg-black/70 right-0 bottom-0">
      <div className="absolute top-1/2 left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h1 className="text-xl">Are you sure you want to delete?👀</h1>
        <div className="flex justify-between items-center gap-x-3 w-full">
          <button
            onClick={() => setToggle(false)}
            className="w-1/2 border border-rose-600 text-rose-600 py-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={deletePost}
            className="w-1/2 border border-rose-600 bg-rose-600 text-white py-2 rounded-xl"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
