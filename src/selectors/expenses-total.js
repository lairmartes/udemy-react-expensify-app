export default (expenses) => {
    const result = expenses
                    .map((expense) => expense.amount)
                    .reduce((result, amount) => result + amount, 0);
    return result;
};