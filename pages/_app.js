import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import TopNav from "../components/TopNav";
import LeftBar from "../components/LeftBar";
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
        <div className="row">
          {/* <div className="col-md-2 ">
          <LeftBar />
        </div> */}
          <div className="col">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
