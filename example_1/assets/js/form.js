class FormBuild {
	constructor(props) {
		this.id = props.id ? props.id : 'form'
		this.value = props.value ? props.value : []
		this.inputId = props.input_id ? props.input_id : 'id_text'
		this.submitId = props.submit_id ? props.submit_id : 'id_submit'
		this.minChar = 50
	}

	generateBody() {
		let form = document.getElementById(this.id),
			body = document.createElement('div'),
			footer = document.createElement('div')

		body.className = 'form__body'
		footer.className= 'form__footer'
		body.innerHTML = `<ul class="list"></ul>`

		return new Promise((resolve, reject) => {
			form.appendChild(body)
			form.appendChild(footer)
			resolve()
		})
	}

	generateInputChat() {
		let footer = this.getPartItem('footer'), 
			input = document.createElement('div'), 
			submitButton = document.createElement('div')

			input.className= 'input'
			input.innerHTML = `<input type="text" class="form-control" id="${this.inputId}" placeholder="Enter message..."/>`

			submitButton.className = 'button'
			submitButton.innerHTML = `<button class="submit active" id="${this.submitId}">send</button>`

			// <span class="tooltip">tooltip</span>
		return new Promise((resolve, reject) => {
			footer.appendChild(input)
			footer.appendChild(submitButton)
			resolve()
		})
	}

	getPartItem(path) {
		let form = document.getElementById(this.id), 
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

	countSpace(string = '') {
		let count = string.match(/\s/g).length, 
			stringLength = string.length
		if(stringLength - count > this.minChar) {
			return false
		}
		return true
	}

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

	onCheckValidate(value) {
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
							let count = this.countSpace(msg)
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

	onClickSubmit() {
		let { value } = document.getElementById(this.inputId)
		this.onCheckValidate(value)
		.then((messages) => {
			messages.forEach(msg => {
				let li = document.createElement('li'), 
				list = this.getPartItem('list')
				li.append(msg)
				list.appendChild(li)
			})
			document.getElementById(this.inputId).value = ''
		}, err => {
			console.log('show tooltip')
			console.log('err ',err)
		})
	}

	onEnterInput(event) {
		event.preventDefault();
	    if (event.keyCode === 13) {
	        this.onClickSubmit()
	    }
	}

	init() {
		try {
			this.generateBody()
			.then(() => {
				return this.generateInputChat()
			})
			.then(() => {
				let submitBtn = document.getElementById(this.submitId)
				let input = document.getElementById(this.inputId)
				if(submitBtn) {
					submitBtn.addEventListener('click', this.onClickSubmit.bind(this))
					input.addEventListener('keyup', this.onEnterInput.bind(this))
				}
			})
		}
		catch(e) {
			console.log('e ',e)
		}
	}
}