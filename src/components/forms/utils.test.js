import { validateInputs } from './utils';

describe('validateInputs', () => {
    it('should return empty error when value is non-empty string', () => {
        const values = {
            name: 'Deluxe',
        };
        const result = {
            name: '',
        };
        expect(validateInputs(values)).toEqual(result);
    });
    it('should return empty error when value is non-empty array', () => {
        const values = {
            ingredients: ['Oil'],
        };
        const result = {
            ingredients: '',
        };
        expect(validateInputs(values)).toEqual(result);
    });
    it('should return error message when value is empty string', () => {
        const values = {
            name: '',
        };
        const result = {
            name: 'Required',
        };
        expect(validateInputs(values, 'Required')).toEqual(result);
    });
    it('should return error message when value is empty array', () => {
        const values = {
            ingredients: [],
        };
        const result = {
            ingredients: 'Required',
        };
        expect(validateInputs(values, 'Required')).toEqual(result);
    });
});
