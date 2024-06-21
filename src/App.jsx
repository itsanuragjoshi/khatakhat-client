import { Route, Routes } from "react-router-dom";
import Footer from "./common/components/footer/Footer";
import Menu from "./common/components/menu/Menu";
import Customers from "./pages/customers/customers";
import CustomersNew from "./pages/customers/customersNew";
import Currencies from "./pages/currencies/currencies";
import CustomersEdit from "./pages/customers/customersEdit";
import CurrenciesNew from "./pages/currencies/currenciesNew";
import Orgprofile from "./pages/organisation/orgprofile";
import OrgprofileNew from "./pages/organisation/orgprofileNew";
import Toast from "./common/components/toast/Toast";
import useToastContext from "./common/hooks/useToastContext";

function App() {
  const { toastList } = useToastContext();

  return (
    <main className="app">
      <Menu />
      <div className="contentContainer">
        <Toast toastList={toastList} />
        <Routes>
          <Route path="/getstarted" element={<OrgprofileNew />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<CustomersNew />} />
          <Route path="/customers/edit" element={<CustomersEdit />} />
          <Route path="/settings/orgprofile/:id" element={<Orgprofile />} />
          <Route path="/settings/currencies/" element={<Currencies />} />
          <Route path="/settings/currencies/new" element={<CurrenciesNew />} />
        </Routes>
        <Footer />
      </div>
    </main>
  );
}

export default App;
