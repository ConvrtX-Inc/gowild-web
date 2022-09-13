import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import type {FC, ReactNode} from 'react';
import {useEffect} from 'react';

interface RTLProps {
    children: ReactNode;
    direction: 'ltr' | 'rtl';
}

const styleCache = () =>
    createCache({
        key: 'rtl',
        prepend: true,
        stylisPlugins: []
    });

export const Rtl: FC<RTLProps> = (props) => {
    const {children, direction} = props;

    useEffect(() => {
        document.dir = direction;
    }, [direction]);

    if (direction === 'rtl') {
        return <CacheProvider value={styleCache()}>{children}</CacheProvider>;
    }

    return <>{children}</>;
};
