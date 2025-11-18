type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export function TabButton({ isActive, onClick, children }: TabButtonProps) {
  const activeStyle = 'border-blue-500 text-blue-500 font-semibold';
  const inactiveStyle = 'border-transparent text-gray-400 hover:text-white';

  return (
    <button
      onClick={onClick}
      className={`border-b-2 px-4 py-2 text-lg transition duration-150 ${
        isActive ? activeStyle : inactiveStyle
      }`}
    >
      {children}
    </button>
  );
}
