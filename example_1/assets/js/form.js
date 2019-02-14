class FormBuild extends Helper {
	constructor(props) {
		super(props)
		this.id = props.id ? props.id : 'form'
		this.value = props.value ? props.value : []
		this.inputId = props.input_id ? props.input_id : 'id_text'
		this.submitId = props.submit_id ? props.submit_id : 'id_submit'
		this.validate = {
			minChar: 50
		}
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
		let footer = super.getPartItem(this.id, 'footer'), 
			input = document.createElement('div'), 
			submitButton = document.createElement('div')

			input.className= 'input'
			input.innerHTML = `<input type="text" class="form-control input-form" id="${this.inputId}" placeholder="Enter message..."/>`

			submitButton.className = 'button'
			submitButton.innerHTML = `<button class="submit" id="${this.submitId}">send</button>`

		return new Promise((resolve, reject) => {
			footer.appendChild(input)
			footer.appendChild(submitButton)
			resolve()
		})
	}

	toggleTooltip(isShow = false) {
		let footer = super.getPartItem(this.id, 'footer'), 
			submitButton = footer.getElementsByClassName("button")[0], 
			tooltip = ''
		if(super.checkExistElement(submitButton)) {
			if(!isShow) {
				tooltip = submitButton.getElementsByClassName('tooltip')[0]
				if(super.checkExistElement(tooltip)) {
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
		return new Promise((resolve, reject) => {
			this.handlePreventAction()
			.then(() => {
				let { value } = document.getElementById(this.inputId)
				super.onCheckValidate(value, this.validate)
				.then((messages) => {
					messages.forEach(msg => {
						let li = document.createElement('li'), 
						list = super.getPartItem(this.id, 'list')
						li.append(msg)
						list.appendChild(li)
					})
					document.getElementById(this.inputId).value = ''
					this.handlePreventAction(true)
					resolve()
				}, err => {
					if(err) {
						this.toggleTooltip(true)
						setTimeout(() => {
							this.toggleTooltip(false)
							this.handlePreventAction(true)
							// reject()
						}, 3000)
					}
				})
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
			return new Promise((resolve, reject) => {
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
						resolve()
					}
				})
			})
		}
		catch(e) {
			console.log('e ',e)
		}
	}
}

// module.exports = FormBuild