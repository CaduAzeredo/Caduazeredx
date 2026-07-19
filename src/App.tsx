import Providers from "./app/providers";
import AppContent from "./app/app";

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
