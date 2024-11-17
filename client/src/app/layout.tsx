import { SegmentProvider } from "./context/SegmentContext"; 
// import AudienceCreator from "./index";
import "./globals.css"; 


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body>
          <SegmentProvider>
            {children}
          </SegmentProvider>
        </body>
      </html>
    </>
  );
}