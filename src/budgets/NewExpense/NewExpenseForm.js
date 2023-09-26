import React from "react";

import Modal from "../../shared/Components/Modal";
import Input from "../../shared/Components/Input";
import Button from "../../shared/Components/Button";

const NewExpenseForm = (props) => {
  return (
    <Modal>
      <form>
        <label>Agrega un nombre</label>
        <Input inputType="input" type="text" placeholder="Nombre o título"></Input>
        <label>Tipo</label>
        <Input inputType="input" type="text" placeholder="Nombre o título"></Input>
        <label>Monto presupuestado</label>
        <Input inputType="input" type="text" placeholder="C"></Input>

        
      </form>
    </Modal>
  );
};

export default NewExpenseForm;
