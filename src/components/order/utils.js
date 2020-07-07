import produce from 'immer';

export const updateIngredients = (name, isChecked) =>
    produce(({ ingredients }) => {
        if (isChecked && !ingredients.includes(name)) {
            ingredients.push(name);
        } else if (!isChecked) {
            const index = ingredients.findIndex((x) => x === name);
            ingredients.splice(index, 1);
        }
    });
