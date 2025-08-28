import { GoogleAnalytics } from "@next/third-parties/google";

interface GoogleAnalyticsComponentProps {
  measurementId: string;
}

export default function GoogleAnalyticsComponent({
  measurementId,
}: GoogleAnalyticsComponentProps) {
  if (!measurementId) {
    return null;
  }

  return <GoogleAnalytics gaId={measurementId} />;
}
