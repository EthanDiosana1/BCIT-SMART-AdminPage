import './UserInfoContainer.css';

export function UserInfoContainer({children}) {
    return (
        <div className="user-info-container">
            {children}
        </div>
    );
}