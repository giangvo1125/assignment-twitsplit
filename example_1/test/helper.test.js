describe('test helper', function() {
    it('splitMessage return multi messages when the message is longer than 50 characters', () => {
        var string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
            arrayMessage = helper.splitMessage(string),
            condition = false
        if(Array.isArray(arrayMessage) && arrayMessage.length == 2) {
            condition = true
        }
        expect(condition).equal(true)
    })

    it('splitMessage will not return multi message when the message is less than 50 characters', () => {
        var string = 'this is test', 
            arrayMessage = helper.splitMessage(string),
            condition = false
        if(Array.isArray(arrayMessage) && arrayMessage.length === 1) {
            condition = true
        }
        expect(condition).equal(true)
    })

    it('countSpace return true when span of non-whitespace is longer than number we set', () => {
        var string = 'thisistest', 
            condition = helper.countSpace(string, 5)
        expect(condition).equal(true)
    })

    it('countSpace return true when span of whitespace is longer than number we set', () => {
        var string = 'this is test', 
            condition = helper.countSpace(string, 20)
        expect(condition).equal(true)
    })

    it('countSpace return false when span of whitespace is less than number we set', () => {
        var string = 'this is test count space', 
            condition = helper.countSpace(string, 2)
        expect(condition).equal(false)
    })

    it('onCheckValidate resolve when the message is less than 50', () => {
        var string = 'this is test', 
            condition = false
        return helper.onCheckValidate(string, {minChar: 50})
        .then(() => {
            condition = true
            expect(condition).equal(true)
        },err => {
            expect(condition).equal(true)
        })
    })

    it('onCheckValidate resolve when the message is longer than 50 characters and have whitespace', () => {
        var string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
            condition = false
        return helper.onCheckValidate(string, {minChar: 50})
        .then(() => {
            condition = true
            expect(condition).equal(true)
        },err => {
            expect(condition).equal(true)
        })
    })

    it('onCheckValidate reject when the message is longer than 50 characters with non-whitespace', () => {
        var string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
            condition = false
        return helper.onCheckValidate(string, {minChar: 50})
        .then(() => {
            expect(condition).equal(true)
        },err => {
            condition = true
            expect(condition).equal(true)
        })
    })
})
