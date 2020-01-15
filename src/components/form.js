import React, {useState, useEffect} from 'react'

function Form() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        industry: 'engineering'
    })

    const [errorState, setErrorState] = useState({
        name: [],
        email: [],
        industry: []
    })

    const [validState, setValidState] = useState(false)

    const [formSentState, setFormSentState] = useState(false)

    const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

    useEffect(() => {
        if(!formSentState){
            const valid = validateAll()
            setValidState(valid)
        }
    })

    const handleChange = (e) => {
        const {name, value, dataset} = e.target

        const {valid, errorMessages} = validate(value, dataset)

        const errorEl = document.querySelector(`[data-for=${name}]`)

        setFormState({
            ...formState,
            [name]: value
        })

        setErrorState({
            ...errorState,
            [name]: errorMessages
        })

        // put in error messages
        errorEl.innerHTML = ''
        if(!valid){
            for(let i = 0; i < errorMessages.length; i++){
                errorEl.innerHTML += `<span>${errorMessages[i]}</span>`
            }
        }else{

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validState){
            // do submit stuff here
            // put on loader
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "contact", ...formState })
              })
                .then(() => setFormSentState(true))
                .catch(error => alert(error))
        }
    }

    const validateAll = () => {
        let valid = true
        // check to see if any errors are in state
        for(let name in formState){
            const { dataset } = document.getElementById(name)
            const {valid: inputValid} = validate(formState[name], dataset)
            if(!inputValid) valid = false
        }

        return valid
    }

    const validate = (value, dataset) => {
        let valid = true
        const errorMessages = []

        if(dataset.required && value === ""){
            valid = false
            errorMessages.push('This field is required')
        }

        if(dataset.email && !emailRegex.test(value)){
            valid = false
            errorMessages.push('Please enter a valid email address')
        }

        return {
            valid: valid,
            errorMessages: errorMessages
        }
    }

    const encode = (data) => {
        return Object.keys(data).map(key => {
            return (
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
        }).join("&")
    }

    const form = (
        <form onSubmit={handleSubmit}>
            <input type="hidden" value="contact" />

            <div>
                <label htmlFor="name">
                    Name
                </label>
                <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} data-required="true" />
                <div className="errors" data-for="name"></div>
            </div>
            
            <div>
                <label htmlFor="email">
                    Email
                </label>
                <input type="text" name="email" id="email" value={formState.email} onChange={handleChange} data-email="true" />
                <div className="errors" data-for="email"></div>
            </div>

            <div>
                <label htmlFor="industry">
                    Industry
                </label>
                <select name="industry" id="industry" value={formState.industry} onChange={handleChange}>
                    <option value="engineering">Engineering</option>
                    <option value="agriculture">Agriculture</option>
                </select>
                <div className="errors" data-for="industry"></div>
            </div>

            <button type="submit" value="Send" disabled={!validState} />
        </form>
    )

    const thankYou = (
        <React.Fragment>
            <p>Thank you for submitting your enquiry.</p>
        </React.Fragment>
    )

    let displayContent = form

    if(formSentState){
        displayContent = thankYou
    }

    return (
        displayContent
    )
}

export default Form