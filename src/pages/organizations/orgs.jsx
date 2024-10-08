import styles from "./org.module.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import Button from "../../common/components/button/Button";

import { generatePermissionToken } from "../../utils/refreshToken";

import AddIcon from "@mui/icons-material/AddOutlined";

const Orgs = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo.userId;
  const { data: userRoles } = useFetchData(
    "/users/byUser",
    {
      userId: userId,
    },
    "authN"
  );

  const buttons = [
    {
      btnType: "button",
      btnClass: "btnPrimary",
      btnText: "New Organization",
      btnIcon: <AddIcon />,
      btnClick: () => navigate("/org/new"),
    },
  ];

  const hasRoles = userRoles && !userRoles?.error && userRoles?.length > 0;

  const handleSelectOrganization = async ({ orgId }) => {
    await generatePermissionToken({ orgId });
    navigate("/dashboard");
  };

  return (
    <>
      <Header title="Select an Organization" buttons={buttons} />
      <main className="orgs">
        <div className="container">
          <div className={styles.listHeader}>
            <p className="fontXL fontBold">Hi {userInfo.userName},</p>
            {hasRoles ? (
              <p>
                You belong to the following organizations. Select one to get
                started.
              </p>
            ) : (
              <p>
                You currently don't belong to any organization. Start by
                creating or joining one to get started.
              </p>
            )}
          </div>

          {hasRoles &&
            userRoles?.map((userRole) => (
              <div className={styles.listItemWrapper} key={userRole.orgId._id}>
                <div className={styles.listItem}>
                  <div>
                    <p className="fontXL fontBold">{userRole.orgId.orgName}</p>
                    <p>Your Role: {userRole.roleId.roleName}</p>
                  </div>
                  <div className="btnToolbar">
                    {userRole.isOrgSelected ? (
                      <Button
                        props={{
                          btnType: "button",
                          btnClass: "btnSecondary",
                          btnText: "SELECTED",
                          btnClick: () => {},
                          btnDisabled: true,
                        }}
                      />
                    ) : (
                      <Button
                        props={{
                          btnType: "button",
                          btnClass: "btnSecondary",
                          btnText: "Select Organization",
                          btnClick: () =>
                            handleSelectOrganization({
                              orgId: userRole.orgId._id,
                            }),
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Orgs;
