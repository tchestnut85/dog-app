const { formatDate } = require('../date');

describe('date util', () => {
  describe('formatDate', () => {
    test('When there is no value', () => {
      const date = formatDate();
      expect(date).toBe(null);
    });

    test('Formats the date correctly', () => {
      const date = formatDate(1619834064554);
      expect(date).toBe('4/30/2021');
    });
  });
});
