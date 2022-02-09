import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import TopNav from "../components/TopNav";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <div className="container-fluid p-0">
        <ToastContainer />
        <TopNav />

        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
