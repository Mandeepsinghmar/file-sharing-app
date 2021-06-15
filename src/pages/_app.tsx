import "tailwindcss/tailwind.css";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return(
  <div className=" w-full h-screen font-mono text-white bg-gray-900 place-items-center">
    <div>
    <Component {...pageProps} />
    </div>
   
  </div>
  )
}

export default MyApp;
