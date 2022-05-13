import { MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { useSetAtom } from 'jotai';
import { isMobileMenuOpenAtom, isSearchOpenAtom } from 'store';
import NavigationTopAccountIcon from './NavigationTopAccountIcon';
import NavigationTopCartIcon from './NavigationTopCartIcon';
import NavigationTopCreateOrSignIn from './NavigationTopCreateOrSignIn';
import NavigationTopCurrencySelect from './NavigationTopCurrencySelect';
import NavigationTopLinks from './NavigationTopLinks';
import NavigationTopMessage from './NavigationTopMessage';

export const NavigationTop = () => {
  const setIsMobileMenuOpen = useSetAtom(isMobileMenuOpenAtom);
  const setIsSearchOpen = useSetAtom(isSearchOpenAtom);

  return (
    <>
      <nav aria-label="Top">
        <a href="#content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>

        {/* Top navigation */}
        <div className="bg-gray-900">
          <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
            {/* Currency selector */}
            <form className="hidden lg:block lg:flex-1">
              <div className="flex">
                <label htmlFor="desktop-currency" className="sr-only">
                  Currency
                </label>
                <div className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                  <NavigationTopCurrencySelect />
                  <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      className="w-5 h-5 text-gray-300"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6 8l4 4 4-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </form>

            <NavigationTopMessage />
            <NavigationTopCreateOrSignIn />
          </div>
        </div>

        {/* Secondary navigation */}
        <div className="bg-white">
          <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:items-center">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <div className="h-8 w-8 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" />
                    </div>
                  </a>
                </div>

                <NavigationTopLinks />

                {/* Mobile menu and search (lg-) */}
                <div className="flex-1 flex items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Search */}
                  <a onClick={() => setIsSearchOpen(true)} className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="#" className="lg:hidden">
                  <span className="sr-only">Workflow</span>
                  <div className="h-8 w-8 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" />
                  </div>
                </a>

                <div className="flex-1 flex items-center justify-end">
                  <div className="flex items-center lg:ml-8">
                    <div className="flex space-x-8">
                      <div className="hidden lg:flex">
                        <a onClick={() => setIsSearchOpen(true)} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Search</span>
                          <SearchIcon className="w-6 h-6" aria-hidden="true" />
                        </a>
                      </div>

                      <div className="flex">
                        <NavigationTopAccountIcon />
                      </div>
                    </div>

                    <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                    <NavigationTopCartIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationTop;