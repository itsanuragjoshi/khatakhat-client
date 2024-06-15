import { useState } from 'react';
import Button from '../../common/components/button/Button';
import Header from '../../common/components/header/Header';
import useFetchData from '../../common/hooks/useFetchData';
import styles from './customersNew.module.css';

const CustomersNew = () => {

    const [input, setInput] = useState({
        customerType: '',
        customerName: '',
        customerDisplayName: '',
        customerEmail: '',
        customerWorkPhone: '',
        customerMobile: '',
        customerCurrency: '',
        customerGST: '',
        customerGSTIN: '',
        customerPlaceOfSupply: '',
        customerBillingCountry: '',
        customerBillingAddress1: '',
        customerBillingAddress2: '',
        customerBillingCity: '',
        customerBillingState: '',
        customerBillingPincode: '',
        customerShippingCountry: '',
        customerShippingAddress1: '',
        customerShippingAddress2: '',
        customerShippingCity: '',
        customerShippingState: '',
        customerShippingPincode: '',
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const finalValue = type === 'checkbox' ? checked : value;

        setInput((prevInput) => ({ ...prevInput, [name]: finalValue }));
    };

    const copyBillingToShipping = () => {
        setInput((prevInput) => ({
            ...prevInput,
            customerShippingCountry: prevInput.customerBillingCountry,
            customerShippingAddress1: prevInput.customerBillingAddress1,
            customerShippingAddress2: prevInput.customerBillingAddress2,
            customerShippingCity: prevInput.customerBillingCity,
            customerShippingState: prevInput.customerBillingState,
            customerShippingPincode: prevInput.customerBillingPincode,
        }));
    };

    const { data: countries, loading: countriesLoading, error: countriesError } = useFetchData(`${import.meta.env.VITE_APP_API_URI}/countries`);

    const { data: billingStates, loading: billingStatesLoading, error: billingStatesError } = useFetchData(
        input.customerBillingCountry ? `${import.meta.env.VITE_APP_API_URI}/states/${input.customerBillingCountry}` : null
    );

    const { data: shippingStates, loading: shippingStatesLoading, error: shippingStatesError } = useFetchData(
        input.customerShippingCountry ? `${import.meta.env.VITE_APP_API_URI}/states/${input.customerShippingCountry}` : null
    );

    return (
        <>
            <Header title="New Customer" />
            <main className="customersNew">
                <form className={styles.form}>
                    <fieldset className={styles.formFieldset}>
                        <div>
                            <legend>Basic Information</legend>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerType" className={styles.required}>Customer Type</label>
                            <div className={styles.formGroupInline}>
                                <div className={styles.formCheck}>
                                    <input type="radio" name="customerType" id="customerTypeBusiness" value="Business" onChange={handleChange} checked={input.customerType === 'Business'} required />
                                    <label htmlFor="customerTypeBusiness">Business</label>
                                </div>
                                <div className={styles.formCheck}>
                                    <input type="radio" name="customerType" id="customerTypeIndividual" value="Individual" onChange={handleChange} checked={input.customerType === 'Individual'} />
                                    <label htmlFor="customerTypeIndividual">Individual</label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerName">Customer Name</label>
                            <input type="text" className={styles.formControl} name="customerName" id="customerName" onChange={handleChange} value={input.customerName} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerDisplayName" className={styles.required}>Customer Display Name</label>
                            <input type="text" className={styles.formControl} name="customerDisplayName" id="customerDisplayName" onChange={handleChange} value={input.customerDisplayName} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerEmail">Customer Email</label>
                            <input type="email" name="customerEmail" id="customerEmail" className={styles.formControl} onChange={handleChange} value={input.customerEmail} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Customer Phone</label>
                            <div className={styles.formGroupInline}>
                                <input type="tel" name="customerWorkPhone" id="customerWorkPhone" className={styles.formControl} placeholder="Work Phone" onChange={handleChange} value={input.customerWorkPhone} />
                                <input type="tel" name="customerMobile" id="customerMobile" className={styles.formControl} placeholder="Mobile" onChange={handleChange} value={input.customerMobile} />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerCurrency">Currency</label>
                            <select name="customerCurrency" id="customerCurrency" onChange={handleChange} value={input.customerCurrency}>
                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerGST" className={styles.required}>GST Treatment</label>
                            <div className={styles.formGroupInline}>
                                <div className={styles.formCheck}>
                                    <input type="radio" name="customerGST" id="gstTreatmentYes" value="Yes" onChange={handleChange} checked={input.customerGST === 'Yes'} required />
                                    <label htmlFor="gstTreatmentYes">Yes</label>
                                </div>
                                <div className={styles.formCheck}>
                                    <input type="radio" name="customerGST" id="gstTreatmentNo" value="No" onChange={handleChange} checked={input.customerGST === 'No'} />
                                    <label htmlFor="gstTreatmentNo">No</label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerGSTIN" className={styles.required}>GSTIN / UIN</label>
                            <input type="text" className={styles.formControl} name="customerGSTIN" id="customerGSTIN" maxLength={15} onChange={handleChange} value={input.customerGSTIN} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerPlaceOfSupply" className={styles.required}>Place of Supply</label>
                            <select name="customerPlaceOfSupply" id="customerPlaceOfSupply" onChange={handleChange} value={input.customerPlaceOfSupply} required>
                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className={styles.formFieldset}>
                        <div><legend>Billing Address</legend></div>
                        <div className={styles.formGroup}>
                            <label htmlFor="customerBillingCountry">Country</label>
                            <select name="customerBillingCountry" id="customerBillingCountry" onChange={handleChange} value={input.customerBillingCountry}>
                                <option value="" disabled>Select Country</option>
                                {countries?.map(({ countryCode, countryName }) => (
                                    <option key={countryCode} value={countryCode}>
                                        {countryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerBillingAddress1">Address</label>
                            <div className={styles.formGroupBlock}>
                                <input type="text" className={styles.formControl} name="customerBillingAddress1" id="customerBillingAddress1" placeholder='Flat/Building Number' onChange={handleChange} value={input.customerBillingAddress1} />
                                <input type="text" className={styles.formControl} name="customerBillingAddress2" id="customerBillingAddress2" placeholder='Area/Locality' onChange={handleChange} value={input.customerBillingAddress2} />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerBillingCity">City</label>
                            <input type="text" className={styles.formControl} name="customerBillingCity" id="customerBillingCity" maxLength={15} onChange={handleChange} value={input.customerBillingCity} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerBillingState">State</label>
                            <select name="customerBillingState" id="customerBillingState" onChange={handleChange} value={input.customerBillingState}>
                                <option value="" disabled>Select State</option>
                                {billingStates?.map(({ stateCode, stateName }) => (
                                    <option key={stateCode} value={stateName}>
                                        {stateName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerBillingPincode">Pincode</label>
                            <input type="text" className={styles.formControl} name="customerBillingPincode" id="customerBillingPincode" onChange={handleChange} value={input.customerBillingPincode} />
                        </div>
                    </fieldset>

                    <fieldset className={styles.formFieldset}>
                        <div>
                            <legend><span>Shipping Address</span>
                                <span>
                                    <Button btnType="button" btnClass="btnLink" btnText="Copy Billing Address" btnClick={(e) => { e.preventDefault(); copyBillingToShipping(); }} />
                                </span>
                            </legend>

                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="customerShippingCountry">Country</label>
                            <select name="customerShippingCountry" id="customerShippingCountry" onChange={handleChange} value={input.customerShippingCountry}>
                                <option value="" disabled>Select Country</option>
                                {countries?.map(({ countryCode, countryName }) => (
                                    <option key={countryCode} value={countryCode}>
                                        {countryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerShippingAddress1">Address</label>
                            <div className={styles.formGroupBlock}>
                                <input type="text" className={styles.formControl} name="customerShippingAddress1" id="customerShippingAddress1" placeholder='Flat/Building Number' onChange={handleChange} value={input.customerShippingAddress1} />
                                <input type="text" className={styles.formControl} name="customerShippingAddress2" id="customerShippingAddress2" placeholder='Area/Locality' onChange={handleChange} value={input.customerShippingAddress2} />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerShippingCity">City</label>
                            <input type="text" className={styles.formControl} name="customerShippingCity" id="customerShippingCity" maxLength={15} onChange={handleChange} value={input.customerShippingCity} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerShippingState">State</label>
                            <select name="customerShippingState" id="customerShippingState" onChange={handleChange} value={input.customerShippingState}>
                                <option value="" disabled>Select State</option>
                                {shippingStates?.map(({ stateCode, stateName }) => (
                                    <option key={stateCode} value={stateName}>
                                        {stateName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerShippingPincode">Pincode</label>
                            <input type="text" className={styles.formControl} name="customerShippingPincode" id="customerShippingPincode" onChange={handleChange} value={input.customerShippingPincode} />
                        </div>
                    </fieldset>
                </form>
                <div className="btnToolbar">
                    <Button btnType="submit" btnClass="btnPrimary" btnText="Add Customer" />
                    <Button btnType="reset" btnClass="btnSecondary" btnText="Cancel" />
                </div>
            </main>
        </>
    );
};

export default CustomersNew;
