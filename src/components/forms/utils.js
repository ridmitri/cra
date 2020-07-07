export const validateInputs = (values, errorMessage = 'Field is required') => {
    const validationErrors = {};
    Object.entries(values).forEach(([name, value]) => {
        validationErrors[name] = value.length === 0 ? errorMessage : '';
    });
    return validationErrors;
};
