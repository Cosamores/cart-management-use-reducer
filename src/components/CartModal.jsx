import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import { CartContext } from '../store/shopping-cart-context';

const CartModal = forwardRef(function Modal(
  {  title , actions },
  ref
) {
  const dialog = useRef();
  const cartCtx = useContext(CartContext);

  const items = cartCtx.items;

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return (
      createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{items.title}</h2>
      
      <Cart items={items} onUpdateItemQuantity={cartCtx.updateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
    
  ));
  
});

export default CartModal;
