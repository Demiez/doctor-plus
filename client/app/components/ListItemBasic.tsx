import * as React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/ListItemBasic.scss';

type ListItemProps = {
  className?: string;
  to?: string;
  children?: React.ReactNode;
};

export const ListItemBasic: React.FC<ListItemProps> = ({ className, to, children }) => {
  return (
    <div className={`list-item-basic ${className}`}>
      <Link to={to}>{children}</Link>
    </div>
  );
};
