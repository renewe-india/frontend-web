const FormSection = ({ children, title }) => (
    <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{children}</div>
    </div>
)
export default FormSection
