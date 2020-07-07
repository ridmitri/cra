import { updateIngredients } from './utils';

describe('updateIngredients', () => {
    it('should remove an ingredient when unchecked', () => {
        const currentValues = {
            ingredients: ['Bacon', 'Mushrooms'],
        };
        const name = 'Bacon';
        const isChecked = false;
        const result = { ingredients: ['Mushrooms'] };
        expect(updateIngredients(name, isChecked)(currentValues)).toEqual(
            result
        );
    });

    it('should not duplicate new ingredient when checked', () => {
        const currentValues = {
            ingredients: ['Bacon', 'Mushrooms'],
        };
        const name = 'Bacon';
        const isChecked = true;
        const result = { ingredients: ['Bacon', 'Mushrooms'] };

        expect(updateIngredients(name, isChecked)(currentValues)).toEqual(
            result
        );
    });

    it('should add an ingredient when checked', () => {
        const currentValues = {
            ingredients: ['Bacon', 'Mushrooms'],
        };
        const name = 'Oil';
        const isChecked = true;
        const result = { ingredients: ['Bacon', 'Mushrooms', 'Oil'] };

        expect(updateIngredients(name, isChecked)(currentValues)).toEqual(
            result
        );
    });
});
