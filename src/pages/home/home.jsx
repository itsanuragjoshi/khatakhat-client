import styles from "./home.module.css";

import { useNavigate } from "react-router-dom";

import ButtonToolbar from "../../common/components/button/ButtonToolbar";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrowOutlined";

const Home = () => {
  const navigate = useNavigate();
  const buttons = [
    {
      btnType: "submit",
      btnClass: "btnPrimary btnL",
      btnText: "Get Started Khata-khat",
      btnIcon: <DoubleArrowIcon />,
      btnClick: () => navigate("/signup"),
    },
  ];
  return (
    <>
      <main className="home">
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroTitle}>
              <h1>
                <span className="headingFontLarge">
                  Simplify Bookkeeping (Bahi-Khata)
                </span>
                <br />
                <span className="headingFontMedium">
                  for your growing business
                </span>
              </h1>
            </div>

            <div className={styles.heroContent}>
              <p>
                Easily manage your finances with{" "}
                <span className="fontBold">KhataKhat</span> — your trusted
                helper for creating professional invoices, tracking payments,
                and managing outstanding amounts. It's a fast, safe, and
                convenient way to keep your business's money matters in order.
              </p>
              <h3>Start managing your finances effortlessly today!</h3>
            </div>
            {buttons && <ButtonToolbar props={buttons} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
