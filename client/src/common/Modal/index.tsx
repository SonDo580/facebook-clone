import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./style.scss";

type ModalProps = {
  title: string;
  onCancel: () => void;
  children: ReactNode;
};

function Modal({ title, onCancel, children }: ModalProps) {
  return (
    <div className="modalWrapper">
      <div className="modal">
        <h1 className="title">{title}</h1>
        <button className="close" onClick={onCancel}>
          <AiOutlineClose />
        </button>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
