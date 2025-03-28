import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useOutsideAlerter } from '../../hooks/useoutsideclick';

interface DropdownItem {
  label: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

interface CustomDropdownProps {
  label: string;
  items: DropdownItem[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { setIsOutside, isoutside } = useOutsideAlerter(wrapperRef);
  console.log('isOutside', isoutside);
  useEffect(() => {
    setIsOpen(!isoutside);
  }, [isoutside]);
  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => {
        setIsOpen(true);
        setIsOutside(false);
      }}
      // onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Button */}
      <button className="flex items-center gap-2 text-[#CECED1] transition-all duration-300 ease-in-out focus:outline-none font-semibold rounded-lg text-sm">
        <span>{label}</span>
        <FaChevronDown className="w-4 h-4 transition-transform duration-300" />
      </button>

      {/* Dropdown Items */}
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-52 bg-white border-4 border-[#3A3C48] rounded-lg shadow-lg overflow-hidden animate-fade-in"
          ref={wrapperRef}
        >
          <ul className="py-2 text-sm text-[#FFFFFF] dark:text-gray-200 bg-[#3A3C48] border-4 border-[#3A3C48]">
            {items.map((item, index) => (
              <li
                key={index}
                className={
                  index === items.length - 1
                    ? 'last:border-t last:border-[#6B6D76] last:mt-2'
                    : ''
                }
              >
                <button
                  style={{ padding: '10px', margin: '2px 0' }}
                  className="flex items-center w-full text-left transition-all duration-200 
                  hover:bg-[#6B6D764D] dark:hover:bg-blue-600 dark:hover:text-[#CECED1] hover:text-[#fff] cursor-pointer
                  gap-[13px] hover:rounded-[10px] border border-transparent hover:border-[#6B6D76] text-[13px] relative"
                  onClick={item.onClick}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                  <FaChevronRight className="absolute transition-opacity duration-200 opacity-0 right-2 group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
