import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import useToastContext from "./common/hooks/useToastContext";

import Toast from "./common/components/toast/Toast";
import Footer from "./common/components/footer/Footer";
import Menu from "./common/components/menu/Menu";
import Loader from "./common/components/loader/Loader";

function Layout() {
  const { toastList } = useToastContext();

  return (
    <main className="layout">
      <Menu />
      <div className="contentContainer">
        <Toast toastList={toastList} />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}

export default Layout;
