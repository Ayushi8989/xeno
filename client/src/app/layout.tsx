import { SegmentProvider } from "./context/SegmentContext"; 
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'An example app with Segment context',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SegmentProvider>{children}</SegmentProvider>
      </body>
    </html>
  );
}
