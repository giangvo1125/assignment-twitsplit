class Helper {
	//splitMessage: function handle cut message into multi messages
	splitMessage(string) {
		let temp = string, arrayMsg = []
		while(temp.length > 0) {
			let substr = temp.substr(0, 45)
			temp = temp.substring(45)
			arrayMsg.push(substr)
		}
		if(arrayMsg.length > 1) {
			for(let i = 0; i < arrayMsg.length; i++) {
				let dot = `${i + 1}/${arrayMsg.length}`
				arrayMsg[i] = `${dot} ${arrayMsg[i]}`
			}
		}
		return arrayMsg
	}
	//countSpace: function boolean that cound space on message
	countSpace(string = '', minChar) {
		let count = string.match(/\s/g) ? string.match(/\s/g).length : null, 
			stringLength = string.length
		if(count != null && stringLength - count > minChar) {
			return false
		}
		return true
	}
	//onCheckValidate: function check message with some condition
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
	//checkExistElement: function boolean check is element existed
	checkExistElement(element) {
		return (typeof element !== 'undefined' && element !== null)
	}
	//getPartItem: function get dom for path
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