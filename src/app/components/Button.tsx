'use client';

const Button = ({ onSave }: { onSave: () => void }) => {
  return (
    <button 
      className="bg-indigo-600 text-white px-5 py-2.5 rounded-md mt-4"
      onClick={onSave}
    >
      Save
    </button>
  )
}

export default Button;