// Mobile Nav
if (customElements.get('mobile-nav') === undefined) {
    customElements.define('mobile-nav', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            // Elements
            this.details = this.querySelector('details');
            this.summary = this.querySelector('summary');

            // Event listeners
            this.details.addEventListener('keyup', (event) => {
                return event.code.toUpperCase() === 'ESCAPE' && this.close();
            });
            this.summary.addEventListener('click', this.onSummaryClick.bind(this));

            console.log('Mobile Nav: Connected', this);
        }

        disconnectedCallback() {
            delete this.details;
            delete this.summary;

            document.body.removeEventListener('click', this.onBodyClickEvent);

            console.log('Mobile Nav: Disconnected', this);
        }

        onSummaryClick(event) {
            event.preventDefault();

            this.isOpen()
              ? this.close()
              : this.open();
        }
        
        onBodyClick(event) {
            if (!this.contains(event.target)) this.close(false);
        }

        isOpen() {
            return this.details.hasAttribute('open');
        }

        open() {
            this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this);
            this.details.setAttribute('open', true);
            document.body.addEventListener('click', this.onBodyClickEvent);

            console.log('Mobile Nav: Open', this);
        }

        close() {
            this.details.removeAttribute('open');
            document.body.removeEventListener('click', this.onBodyClickEvent);

            console.log('Mobile Nav: Close', this);
        }
    });
}



// Contact Form
if (customElements.get('contact-form') === undefined) {
    customElements.define('contact-form', class extends HTMLElement {
        constructor() {
            super();

            console.log('Contact Form: Constructor', this);
        }

        connectedCallback() {
            // Elements
            this.form = this.querySelector('form');
            this.inputs = Array.from(this.form.elements).filter((input) => {
                const inputTypes = ['input', 'select', 'textarea'];
                if (inputTypes.includes(input.nodeName.toLowerCase())) return true;
                return false;
            });

            // Bind 'this' context to event handlers
            this.onSubmit = this.onSubmit.bind(this);
            this.onReset = this.onReset.bind(this);
            this.onInput = this.onInput.bind(this);

            // Event listeners
            this.form.addEventListener('submit', this.onSubmit);
            this.form.addEventListener('reset', this.onReset);
            this.inputs.forEach((input) => input.addEventListener('input', this.onInput));

            console.log('Contact Form: Connected', this);
        }

        disconnectedCallback() {
            // Remove event listeners
            this.form.removeEventListener('submit', this.onSubmit);
            this.inputs.forEach((input) => input.removeEventListener('input', this.onInput));

            // Delete properties
            delete this.form;
            delete this.onSubmit;
            delete this.onReset;
            delete this.onInput;

            console.log('Contact Form: Disconnected', this);
        }

        onSubmit(event) {
            event.preventDefault();

            console.log('Contact Form: Submit - Validating...');

            let isFormValid = true;
            this.inputs.forEach((input) => {
                const isValid = this.validateInput(input);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            console.log('Contact Form: Submit - Validated!!', isFormValid);

            if (isFormValid) {
                // this.form.submit();
            }

            console.log('Contact Form: Submitted!!', isFormValid);
        }

        onReset(event) {
            // event.preventDefault();

            this.inputs.forEach((input) => {
                this.updateInputValid(input);
            });

            console.log('Contact Form: Reset', this);
        }

        onInput(event) {
            const isValid = this.validateInput(event.target);
        }

        validateInput(input) {
            if (!input.willValidate) return true;
      
            const isValid = input.checkValidity();
      
            if (!isValid) {
                this.updateInputInvalid(input);
            } else {
                this.updateInputValid(input);
            }
      
            return isValid;
        }

        updateInputValid(input) {
            const container = input.parentNode;
            const label = container.querySelector('label');
            const error = container.querySelector('p');
            
            label.classList.remove('text-red-500');
            input.classList.remove('text-red-500', 'placeholder-red-500');
            input.classList.remove('border-red-500');
            input.removeAttribute('aria-invalid');
            if (error) {
                input.removeAttribute('aria-describedby');
                error.classList.remove('text-red-500');
                error.textContent = '';
                error.setAttribute('hidden', true);
            }
        }

        updateInputInvalid(input) {
            const container = input.parentNode;
            const label = container.querySelector('label');
            const error = container.querySelector('p');

            const validationError = this.getValidationError(input);
        
            label.classList.add('text-red-500');
            input.classList.add('text-red-500', 'placeholder-red-500');
            input.classList.add('border-red-500');
            input.setAttribute('aria-invalid', true);
            if (error) {
                input.setAttribute('aria-describedby', input.id + '-error');
                error.classList.add('text-red-500');
                error.textContent = validationError;
                error.removeAttribute('hidden');
            }
        }
      
        getValidationError(input) {
            if (input.validity.badInput) {
                return 'This field has an invalid value.';
            } else if (input.validity.customError) {
                return input.validity.customError;
            } else if (input.validity.patternMismatch) {
                return 'This field does not meet the correct format.';
            } else if (input.validity.rangeUnderflow) {
                return 'This field is below the minimum value.';
            } else if (input.validity.rangeOverflow) {
                return 'This field is above the maximum value.';
            } else if (input.validity.stepMismatch) {
                return 'This field has a mismatched step.';
            } else if (input.validity.tooShort) {
                return 'This field is too short.';
            } else if (input.validity.tooLong) {
                return 'This field is too long.';
            } else if (input.validity.typeMismatch) {
                return 'This field has a mismatched type.';
            } else if (input.validity.valueMissing) {
                return 'This field is required.';
            }
      
            return 'This field is invalid.';
        }
    });
}