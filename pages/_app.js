import "../styles/globals.css";
import { TrackingProvider } from "../Conetxt/TrackingContext";
import { NavBar,Footer } from "../Components";

export default function App({ Component, pageProps }) {
  return (
    <>
    <TrackingProvider>
    <NavBar/>
    <Component {...pageProps} />
    </TrackingProvider>
    <Footer/>
    </>
  );
}
