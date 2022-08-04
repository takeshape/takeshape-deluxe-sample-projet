import Seo from 'components/Seo';
import { NextSeoProps } from 'next-seo';
import { PropsWithChildren } from 'react';

export interface LayoutProps {
  seo: NextSeoProps;
}

export const Layout = ({ children, seo }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className="h-full bg-muted">
      <div className="h-full">
        <Seo {...seo} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
