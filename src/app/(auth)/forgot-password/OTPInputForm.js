'use client'

import InputField from '@/components/ui/InputField'

const OTPInputForm = ({ otp, setOtp, password, setPassword }) => {
    return (
        <>
            <div>
                <InputField
                    id="otp"
                    label="OTP"
                    type="number"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                    className="input input-primary w-full"
                />
            </div>
            <div>
                <InputField
                    id="password"
                    label="New Password"
                    type="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="input input-primary w-full"
                />
            </div>
        </>
    )
}

export default OTPInputForm
