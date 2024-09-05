import ComingSoon from "../../common/components/commingSoon/ComingSoon";
import Header from "../../common/components/header/Header";

const Dashboard = () => {
  return (
    <>
      <Header title="Dashboard" />
      <main className="dashboard relative">
        <ComingSoon />
      </main>
    </>
  );
};

export default Dashboard;
