import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface DialogueProps {
  handleDelete: () => void;
  isDeleteState: boolean;
  setIsDeleteState: (state: boolean) => void;
  isDeleting:boolean;
}

const Dialogue = ({ handleDelete, isDeleteState, setIsDeleteState ,isDeleting}: DialogueProps) => {
  return (
    <Dialog open={isDeleteState} onOpenChange={setIsDeleteState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
        </DialogHeader>
        <DialogFooter>

          <button onClick={handleDelete} className='flex items-center justify-center gap-3 py-1 bg-rose-300 px-2 text-sm font-poppins font-normal rounded-lg hover:bg-rose-500 transition 0.1s ease-out hover:text-white'>
            {isDeleting ? (
              <img
              src="/arrow.png"
              alt="loading"
              width={20}
              height={20}
              className="animate-spin"
            />
            ):(
                <>
                Confirm
            <img src="/mark.png" alt="confirm" height={20} width={20}/>
                </>
            )}
           
            </button>
          <button onClick={() => {
            setIsDeleteState(false)
            
            }} className='hover:bg-black hover:bg-opacity-25 transition 0.1s ease-in px-2 py-1 rounded-lg'>Cancel</button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Dialogue;
