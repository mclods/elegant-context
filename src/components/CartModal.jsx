import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import './CartModal.css';

const CartModal = forwardRef(function CartModal(
  { title, modalContent, modalButtons },
  ref
) {
  const dialogRef = useRef();

  useImperativeHandle(ref, function () {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      className="w-1/3 max-h-[50vh] p-5 rounded-md shadow-xl backdrop:bg-stone-900/90"
    >
      <p className="px-2 py-1 border border-slate-100 mb-4 bg-slate-100 rounded-md shadow-inner font-merriweather text-2xl font-bold">
        {title}
      </p>
      <div className="px-2">{modalContent}</div>
      <form method="dialog">
        <div className="flex justify-end modalButtonsContainer">
          {modalButtons}
        </div>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
