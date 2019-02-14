describe('test form', function() {
    it('FormBuild render', () => {
        let condition = false, 
            findItem = document.getElementsByClassName('form__body')
        if(findItem.length > 0) {
            condition = true
        }
        expect(condition).equal(true)
    })

    it('FormBuild type something on input', async () => {
        let condition = false, 
            value = 'something', 
            input = document.getElementsByClassName('input-form')[0], 
            submitButton = document.getElementsByClassName('submit')[0]
        if(input) {
            input.value = value
            submitButton.click()  
            setTimeout(() => {
                let list = document.getElementsByClassName('list')[0]
                if(list.hasChildNodes()) {
                    condition = true
                }
                expect(condition).equal(true)
            },100)
        }
        else {
            expect(condition).equal(true)
        }
    })

    it('FormBuild type wrong and show error', () => {
        let condition = false, 
            value = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
            input = document.getElementsByClassName('input-form')[0], 
            submitButton = document.getElementsByClassName('submit')[0]
        if(input) {
            input.value = value
            submitButton.click()  
            setTimeout(() => {
                let tooltip = document.getElementsByClassName('tooltip')[0]
                if(tooltip) {
                    condition = true
                }
                expect(condition).equal(true)
            },100)
        }
        else {
            expect(condition).equal(true)
        }
    })
})
