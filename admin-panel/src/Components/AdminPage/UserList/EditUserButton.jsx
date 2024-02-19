import './EditUserButton.css';

export function EditUserButton({handleClick}) {
    return (
        <button onClick={handleClick}>
           <i className="fa-solid fa-wrench"></i>
        </button>
    );
}