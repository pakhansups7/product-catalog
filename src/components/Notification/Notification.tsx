import "./Notification.css";

type NotificationProps = {
    message: string | null;
};

export function Notification({ message }: NotificationProps) {
    if (!message) {
        return null;
    }

    return (
        <div className="app-notification">
            {message}
        </div>
    );
}