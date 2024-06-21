import Header from "../../common/components/header/Header";
import FormCurrenciesAddEdit from "../../common/components/form/FormCurrenciesAddEdit";

const CurrenciesNew = () => {
  const initialInputValues = {
    currencyCode: "",
    currencyName: "",
    currencySymbol: "",
  };

  return (
    <>
      <Header title="New Currency" />
      <main className="currenciesNew">
        <FormCurrenciesAddEdit
          initialInputValues={initialInputValues}
          formId="formCurrenciesAdd"
        />
      </main>
    </>
  );
};

export default CurrenciesNew;
