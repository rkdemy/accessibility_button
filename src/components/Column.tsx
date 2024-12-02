import React, { useState } from "react";
import styles from "./styles/Column.module.css";

type ColumnProps = {
  title: number;
  deleteArray: (title: number) => void;
};

const Column: React.FC<ColumnProps> = ({ title, deleteArray }) => {
  const [isHide, setHide] = useState(false);

  const HideAnimation = () => {
    setHide(true);

    setTimeout(() => {
      deleteArray(title);
    }, 700);
  };

  return (
    <div className={isHide ? `${styles.hide}` : `${styles.container}`}>
      Column {title}
      <button onClick={HideAnimation}>Delete</button>
    </div>
  );
};

export default Column;
