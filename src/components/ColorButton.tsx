interface ColorButtonProps {
  color: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ColorButton: React.FC<ColorButtonProps> = ({ 
  color, 
  onClick, 
  children, 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: color,
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'opacity 0.2s ease-in-out',
        margin: 10,
        display: 'flex',
        gap: 5,
      }}
    >
      {children}
    </button>
  );
};

export default ColorButton;
