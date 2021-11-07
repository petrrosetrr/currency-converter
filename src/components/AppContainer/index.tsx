import React from 'react';
import styles from './index.module.scss';
import cn from "classnames";

interface IProps {
    className?: string;
    [key: string]: any;
}

const AppContainer: React.FC<IProps> = ({className, children, ...rest}) => {
    return (
        <div className={cn(styles.main, className)} {...rest}>
            {children}
        </div>
    );
};

export default AppContainer;
