// app/providers.tsx
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

export default function Providers({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}