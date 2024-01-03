import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: Props) => {
  return (
    <div className={"px-4 py-8 w-full flex-1".concat(` ${className}`)}>
      {children}
    </div>
  );
};

export default Layout;
