import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const CartModal = forwardRef(function CartModal(props, ref) {
  const dialogRef = useRef();

  useImperativeHandle(ref, function () {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialogRef}>
      <p>Your Cart</p>
      <p>Cart</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
