const sum = (a, b) => a + b

describe('Sample test', () => {
    it('1 + 2 should equal to 3', () => {
        expect(sum(1, 2)).toEqual(3)
    })
})