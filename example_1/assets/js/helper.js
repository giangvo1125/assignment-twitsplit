class Helper {
	splitMessage(string) {
		let temp = string, arrayMsg = []
		while(temp.length > 0) {
			let substr = temp.substr(0, 45)
			temp = temp.substring(45)
			arrayMsg.push(substr)
		}
		for(let i = 0; i < arrayMsg.length; i++) {
			let dot = `${i + 1}/${arrayMsg.length}`
			arrayMsg[i] = `${dot} ${arrayMsg[i]}`
		}
		return arrayMsg
	}

	countSpace(string = '', minChar) {
		let count = string.match(/\s/g).length, 
			stringLength = string.length
		if(stringLength - count > minChar) {
			return false
		}
		return true
	}

	onCheckValidate(value, condition) {
		return new Promise((resolve, reject) => {
			switch(true) {
				case value.length >= 50:
					let spaceLength = value.match(/\s/g)
					if(spaceLength == null) {
						reject({key: 'max_length', msg: 'max legnth'})
					}
					else {
						let arrayMsg = this.splitMessage(value)
						let isValid = true
						arrayMsg.forEach(msg => {
							let count = this.countSpace(msg, condition.minChar)
							if(!msg) {
								isValid = false
							}
						})
						if(!isValid) {
							reject({key: 'max_length_sub', msg: 'max legnth'})
						}
						else {
							resolve(arrayMsg)
						}
					}
				break
				default:
					if(value == '') {
						reject('')
					}
					else {
						resolve([value])
					}
				break
			}
		})
	}

	checkExistElement(element) {
		return (typeof element !== 'undefined' && element !== null)
	}

	getPartItem(id, path) {
		let form = document.getElementById(id), 
			body = form.getElementsByClassName("form__body")[0], 
			footer = form.getElementsByClassName("form__footer")[0]
		switch(path) {
			case 'list':
				return body.getElementsByClassName("list")[0]
			break
			case 'body':
				return body
			break
			case 'footer':
				return footer
			break
			default:
				return form 
			break
		}
	}
}