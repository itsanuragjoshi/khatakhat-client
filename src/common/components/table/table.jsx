import ActionList from "../actionList/ActionList";
import styles from "./table.module.css";

const Table = ({ data, actionList }) => {
  // Handle potential errors or empty data
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  // Extract property names dynamically from the first object in data
  const propertyNames = Object.keys(data[0]);

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {propertyNames.map((propName) => (
            <th className={styles.th} key={propName}>
              {propName}
            </th>
          ))}
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((row, index) => (
          <tr key={index} className={styles.tr}>
            {propertyNames.map((propName) => (
              <td className={styles.td} key={`${propName}-${index}`}>
                {row[propName]}
              </td>
            ))}
            <td className={styles.td}>
              <ActionList actionList={actionList} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;