import "./StatusMessage.css"

type StatusMessageProps = {
    title: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
};

export function StatusMessage({ title, description, buttonText, onButtonClick }: StatusMessageProps) {
    return (
        <div className="status-message">
            <h2 className="status-message__title">{title}</h2>

            {description && (
                <p className="status-message__description">
                    {description}
                </p>
            )}

            {buttonText && onButtonClick && (
                <button
                    className="status-message__button"
                    type="button"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
}