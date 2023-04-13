import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarButton } from '../Sidebar/SidebarButton';
import { IconLanguage } from '@tabler/icons-react';


interface Props {
  onLanguageChange: (languageCode: string) => void;
}

export const LanguageSelector: FC<Props> = ({ onLanguageChange }) => {
  const { t } = useTranslation('sidebar');

  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageClick = (languageCode?: string) => {
    onLanguageChange(languageCode!);
    // Redirect to home with / language code 
    window.location.href = `/${languageCode}`;    
    setIsOpen(false);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      setIsOpen(false);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
  <>
    <SidebarButton
      text={t('Change Language')}
      icon={<IconLanguage size={18} />}
      onClick={() => setIsOpen(true)}
    />

    {isOpen && (
      <div
        className="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onKeyDown={handleEnter}
      >
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            />

            <div
              ref={modalRef}
              className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-hidden rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
              role="dialog"
            >
              <div className="mb-10 text-4xl">{t('Available Languages')}</div>

                <div className="mt-6 text-sm font-bold text-black dark:text-neutral-200">
                  {t('Select Language')}

                </div>
                <button
                className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                onClick={() => handleLanguageClick('en')}
              >
                English
              </button>
              <button
                className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                onClick={() => handleLanguageClick('fr')}
              >
                Français
              </button> 
              <button
                className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                onClick={() => handleLanguageClick('ar')}
              >
                عربي
              </button>               
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
};