import { AppProps } from "next/app";
import { SegmentProvider } from "./context/SegmentContext"; // Adjust path if necessary
import AudienceCreator from "./pages/audienceCreation";

function MyApp({pageProps }: AppProps) {
  return (
    <SegmentProvider>
      <AudienceCreator {...pageProps} />
    </SegmentProvider>
  );
}

export default MyApp;
