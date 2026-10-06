import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Jardín de dos · Finanzas que florecen',description:'Tu dinero, nuestras metas. Un jardín financiero para crecer juntos.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
