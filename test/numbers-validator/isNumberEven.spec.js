const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const NumbersValidator = require('../../app/numbers-validator');

describe('NumbersValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  describe('isNumberEven', () => {
    describe('positive tests', () => {
      [2, 4, 100, 0, -6].forEach((n) => {
        it(`should return true for even number ${n}`, () => {
          expect(validator.isNumberEven(n)).to.be.equal(true);
        });
      });
    });

    describe('negative tests', () => {
      [1, 5, 99, -3].forEach((n) => {
        it(`should return false for odd number ${n}`, () => {
          expect(validator.isNumberEven(n)).to.be.equal(false);
        });
      });

      it('should return false for a non-integer number (2.5)', () => {
        expect(validator.isNumberEven(2.5)).to.be.equal(false);
      });

      it('should throw an error when a string is provided', () => {
        const input = 'four';
        expect(() => validator.isNumberEven(input)).to.throw(
          `[${input}] is not of type "Number" it is of type "${typeof input}"`,
        );
      });

      [null, undefined, true].forEach((input) => {
        it(`should throw an error when ${input} is provided`, () => {
          expect(() => validator.isNumberEven(input)).to.throw('is not of type "Number"');
        });
      });
    });
  });
////////////

  describe('getEvenNumbersFromArray', () => {
    it('should return only even numbers from an array', () => {
      expect(validator.getEvenNumbersFromArray([1, 2, 3, 4, 5, 6])).to.deep.equal([2, 4, 6]);
    });

    it('should return an empty array when there are no even numbers', () => {
      expect(validator.getEvenNumbersFromArray([1, 3, 5])).to.deep.equal([]);
    });

    it('should return an empty array for an empty array', () => {
      expect(validator.getEvenNumbersFromArray([])).to.deep.equal([]);
    });

    it('should include 0 and negative even numbers', () => {
      expect(validator.getEvenNumbersFromArray([-4, -3, 0, 7])).to.deep.equal([-4, 0]);
    });

    it('should throw an error when the array contains a non-number', () => {
      expect(() => validator.getEvenNumbersFromArray([2, 'a', 4])).to.throw(
        '[2,a,4] is not an array of "Numbers"',
      );
    });

    it('should throw an error when the argument is not an array', () => {
      expect(() => validator.getEvenNumbersFromArray('abc')).to.throw(
        '[abc] is not an array of "Numbers"',
      );
    });
  });
///////////

  describe('isAllNumbers', () => {
    it('should return true when all elements are numbers', () => {
      expect(validator.isAllNumbers([1, 2.5, -3, 0])).to.be.equal(true);
    });

    it('should return true for an empty array', () => {
      expect(validator.isAllNumbers([])).to.be.equal(true);
    });

    it('should return false when at least one element is not a number', () => {
      expect(validator.isAllNumbers([1, '2', 3])).to.be.equal(false);
    });

    it('should throw an error when the argument is not an array', () => {
      expect(() => validator.isAllNumbers('abc')).to.throw('[abc] is not an array');
    });

    it('should throw an error when the argument is undefined', () => {
      expect(() => validator.isAllNumbers(undefined)).to.throw('is not an array');
    });
  });
///////////

  describe('isInteger', () => {
    [0, 7, -12].forEach((n) => {
      it(`should return true for integer ${n}`, () => {
        expect(validator.isInteger(n)).to.be.equal(true);
      });
    });

    [2.5, -0.1].forEach((n) => {
      it(`should return false for non-integer ${n}`, () => {
        expect(validator.isInteger(n)).to.be.equal(false);
      });
    });

    it('should throw an error when a string is provided', () => {
      expect(() => validator.isInteger('5')).to.throw('[5] is not a number');
    });

    it('should throw an error when null is provided', () => {
      expect(() => validator.isInteger(null)).to.throw('[null] is not a number');
    });
  });
});