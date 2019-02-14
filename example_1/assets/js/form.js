class FormBuild {
	constructor(props) {
		this.id = props.id ? props.id : 'form'
		this.value = props.value ? props.value : []
		this.inputId = props.input_id ? props.input_id : 'id_text'
		this.submitId = props.submit_id ? props.submit_id : 'id_submit'
		this.minChar = 50
		this.isLoadingSubmit = false
	}

	handlePreventAction(isSetDefault = false) {
		if(!isSetDefault) {
			return new Promise((resolve, reject) => {
				if(!this.isLoadingSubmit) {
					this.isLoadingSubmit = true
					resolve()
				}
			})
		}
		else {
			this.isLoadingSubmit = false
		}
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
			submitButton.innerHTML = `<button class="submit" id="${this.submitId}">send</button>`

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

	checkExistElement(element) {
		return (typeof element !== 'undefined' && element !== null)
	}

	toggleTooltip(isShow = false) {
		let footer = this.getPartItem('footer'), 
			submitButton = footer.getElementsByClassName("button")[0], 
			tooltip = ''
		if(this.checkExistElement(submitButton)) {
			if(!isShow) {
				tooltip = submitButton.getElementsByClassName('tooltip')[0]
				if(this.checkExistElement(tooltip)) {
					tooltip.parentNode.removeChild(tooltip)
				}
			}
			else {
				tooltip = document.createElement('span')
				tooltip.className = 'tooltip'
				tooltip.innerHTML = 'Error'
				submitButton.appendChild(tooltip)
			}
		}

	}

	onClickSubmit() {
		this.handlePreventAction()
		.then(() => {
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
				this.handlePreventAction(true)
			}, err => {
				if(err) {
					this.toggleTooltip(true)
					setTimeout(() => {
						this.toggleTooltip(false)
						this.handlePreventAction(true)
					}, 3000)
				}
			})
		})
	}

	onEnterInput(event) {
		event.preventDefault();
	    if (event.keyCode === 13) {
	        this.onClickSubmit()
	    }
	    else {
	    	let { value } = event.target
	    	let submitButton = document.getElementById(this.submitId)
	    	if(value && value != '') {
	    		submitButton.classList.add('active')
	    	}
	    	else {
	    		submitButton.classList.remove('active')
	    	}
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