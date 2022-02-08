import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import TopNav from "../components/TopNav";
import LeftBar from "../components/LeftBar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container-fluid p-0">
      <TopNav />
      <div className="row">
        <div className="col-md-2 ">
          <LeftBar />
        </div>
        <div className="col-md-10">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
