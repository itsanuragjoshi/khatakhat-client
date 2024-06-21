import styles from "./actionList.module.css";

const ActionList = ({ actionList }) => {
  return (
    <div className={styles.actionList}>
      {actionList.map((item, index) => (
        <small key={index} title={item.title} aria-label={item.title}>
          {item.icon ? item.icon : item.title}
        </small>
      ))}
    </div>
  );
};

export default ActionList;
