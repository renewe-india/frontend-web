'use client'

const OTPInputForm = ({ otp, setOtp, password, setPassword }) => {
    return (
        <>
            <div>
                <label htmlFor="otp" className="block text-sm font-medium">
                    OTP
                </label>
                <input
                    id="otp"
                    type="number"
                    placeholder="Enter OTP"
                    className="input input-primary w-full"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium">
                    New Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter New Password"
                    className="input input-primary w-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
        </>
    )
}

export default OTPInputForm
