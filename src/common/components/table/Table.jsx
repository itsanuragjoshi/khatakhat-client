import styles from "./table.module.css";

import ButtonToolbar from "../button/ButtonToolbar";

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="container">No data to display.</p>;
  }

  // Extract property names dynamically from the first object in data, excluding 'actions'
  const propertyNames = Object.keys(data[0]).filter(
    (propName) => propName !== "actions"
  );

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {propertyNames?.map((propName) => (
            <th
              key={propName}
              className={`${styles.th} ${data[0][propName]?.align || ""}`}
            >
              {propName}
            </th>
          ))}
          <th className={`${styles.th} ${data[0].actions?.align || ""}`}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data?.map((row, index) => (
          <tr key={index} className={styles.tr}>
            {propertyNames?.map((propName) => (
              <td
                key={`${propName}-${index}`}
                className={`${styles.td} ${row[propName]?.align || ""}`}
              >
                {row[propName]?.value}
              </td>
            ))}
            <td className={`${styles.td} ${row.actions?.align || ""}`}>
              <ButtonToolbar props={row.actions?.value} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
