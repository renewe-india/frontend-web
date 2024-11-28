'use client'

const ContactInputForm = ({
    contactType,
    setContactType,
    countryCode,
    setCountryCode,
    contact,
    setContact,
    countryCodes,
}) => {
    return (
        <>
            <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="contactType"
                        value="email"
                        checked={contactType === 'email'}
                        onChange={() => setContactType('email')}
                        className="form-radio"
                    />
                    <span>Email</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="contactType"
                        value="mobile"
                        checked={contactType === 'mobile'}
                        onChange={() => setContactType('mobile')}
                        className="form-radio"
                    />
                    <span>Mobile</span>
                </label>
            </div>

            <div className="flex items-center gap-2">
                {contactType === 'mobile' && (
                    <select
                        id="countryCode"
                        className="input input-primary w-1/4"
                        value={countryCode}
                        onChange={event => setCountryCode(event.target.value)}>
                        {countryCodes.map(code => (
                            <option key={code.code} value={code.code}>
                                +{code.code} : {code.country}
                            </option>
                        ))}
                    </select>
                )}
                <input
                    id="contact"
                    placeholder={
                        contactType === 'email'
                            ? 'Email Address'
                            : 'Mobile Number'
                    }
                    className={`input input-primary ${
                        contactType === 'mobile' ? 'w-3/4' : 'w-full'
                    }`}
                    type={contactType === 'email' ? 'text' : 'tel'}
                    pattern={contactType === 'mobile' ? '[0-9]{10}' : undefined}
                    value={contact}
                    onChange={event => setContact(event.target.value)}
                    required
                />
            </div>
        </>
    )
}

export default ContactInputForm
