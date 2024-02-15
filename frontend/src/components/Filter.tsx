import React from "react";

interface Props {
  list: string[];
  activeItem: string;
  category: string;
  onChange: (item: string) => void;
}

export const Filter: React.FC<Props> = ({
  list,
  activeItem,
  category,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: string) => {
    onChange(item);
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="flex items-center"
      >
        {category}: {activeItem}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-down-fill ml-2"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>
      <div
        id="fade-menu"
        className={`menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        {list.map((item) => (
          <button
            key={item}
            className={`menu-item ${item === activeItem ? "active" : ""}`}
            onClick={() => handleClose(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
