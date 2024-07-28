import Header from "../../common/components/header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/AddOutlined";
import styles from "./org.module.css";
import Button from "../../common/components/button/Button";

const OrgSelect = () => {
  const navigate = useNavigate();
  const { userInfo, userRoles } = useSelector((state) => state.auth);

  const buttons = [
    {
      btnType: "button",
      btnClass: "btnPrimary",
      btnText: "Add Organisation",
      btnIcon: <AddIcon />,
      btnClick: () => navigate("/org/new"),
    },
  ];

  // Check if userRoles is not empty and does not contain an error
  const hasRoles = userRoles && !userRoles.error && userRoles.length > 0;

  return (
    <>
      <Header title="Select an Organisation" buttons={buttons} />
      <main className="orgEdit">
        <div className="container">
          <div className={styles.listHeader}>
            <p className="text-xl font-bold">Hi {userInfo.userName},</p>
            {hasRoles ? (
              <p>
                You belong to the following organisations. Select one to get
                started.
              </p>
            ) : (
              <p>
                You currently don't belong to any organisation. Start by
                creating or joining one to get started.
              </p>
            )}
          </div>

          {hasRoles &&
            userRoles.map((userRole) => (
              <div className={styles.listItemWrapper} key={userRole.orgId._id}>
                <div className={styles.listItem}>
                  <div>
                    <p className="text-xl font-bold">
                      {userRole.orgId.orgName}
                    </p>
                    <p>Organisation ID: {userRole.orgId._id}</p>
                    <p>Your Role: {userRole.roleId.roleName}</p>
                  </div>
                  <div className="btnToolbar">
                    <Button
                      props={{
                        btnType: "button",
                        btnClass: "btnSecondary",
                        btnText: "Select Organisation",
                        btnClick: () =>
                          navigate(`/org/${userRole.orgId._id}/dashboard`),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default OrgSelect;
