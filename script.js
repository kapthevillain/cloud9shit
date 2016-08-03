$(document).ready(function() {

  $("#shirtForm").validate({
      rules: {
        color: "required",
        size: "required",
        numShirts: "required",
        firstNamePay: {
          required: true,
          lettersonly:true,
          minlength: 2,
        },
        lastNamePay: {
          required: true,
          lettersonly:true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        addressPay: {
          required: true,
        },
        cityPay: {
          required: true,
          lettersonly: true
        },
        statePay: {
          required: true,
          stateUS: true
        },
        zipCodePay: {
          required: true,
          zipcodeUS: true
        },
        firstNameShip: {
          required: "#shippingInfo:checked",
          lettersonly: true,
          minlength: 2
        },
        lastNameShip: {
          required: "#shippingInfo:checked",
          lettersonly: true,
          minlength: 2
        },
        addressShip: {
          required: "#shippingInfo:checked"
        },
        cityShip: {
          required: "#shippingInfo:checked",
          lettersonly: true
        },
        stateShip: {
          required: "#shippingInfo:checked",
          stateUS: true
        },
        zipCodeShip: {
          required: "#shippingInfo:checked",
          zipcodeUS: true
        },
        creditCardNum: {
          required: true,
          creditcard: true
        },
        expMonth: "required",
        expYear: "required",
        cardType: "required",
        CVV: {
          required: true,
          digits: true,
          minlength:3,
          maxlength: 3
        }
    },

    messages: {
      color: "Please pick a color from the list.",
      size: "Please choose a size.",
      numShirts: "We need to know how many shirts you want.",
      firstNamePay: {
        required: "Please enter your first name.",
        minlength: "Your name must be 2 or more characters."
      },
      lastNamePay: {
        required: "Please enter your last name.",
        minlength: "Your name must be 2 or more characters."
      },
      email: {
        required: "We need your email to send you a receipt. We promise not to spam you."
      },
      addressPay: "Please enter your address.",
      cityPay: "Please enter a city.",
      statePay: {
        required: "Please enter a valid U.S. state.",
      },
      zipCodePay: {
        required: "Please enter a valid zip code."
      },
      firstNameShip: {
        required: "Please enter your first name.",
        minlength: "Your name must be 2 or more characters."
      },
      lastNameShip: {
        required: "Please enter your last name.",
        minlength: "Your name must be 2 or more characters."
      },
      addressShip: "Please enter your address.",
      cityShip: "Please enter a city.",
      stateShip: {
        required: "Please enter a valid U.S. state.",
      },
      zipCodeShip: {
        required: "Please enter a valid zip code."
      },
	  creditCardNum: {
		  required: "We need this to process your order.",
	  },
	  CVV: {
		  required: "We need this security code to process your card."
	  }
    },

    submitHandler: function() {
      alert("Your Order has been Submitted! Thank you for your Business!")
    },

    showErrors: function(errorMap, errorList) {
      $("#summary").html("Your form contains "
        + this.numberOfInvalids()
        + " errors, scroll up to fix them.");
      this.defaultShowErrors();
    },

    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.attr("name") == "size") {
            error.insertAfter("#lastSize");
        }
        else {
            error.insertAfter(element);
        }
    }

  });

  // If shipping address is different than billing address...

  var shippingInfo = $("#shippingInfo");
  var isItChecked = shippingInfo.is(":checked");
  // alert(isItChecked);
  var shipFieldset = $("#shipInfoField")[isItChecked ? "removeClass" : "addClass"]("hide");
  var shippingInputs = shipFieldset.find("input").attr("disable", !isItChecked);

  shippingInfo.click(function(){
    shipFieldset[this.checked ? "removeClass" : "addClass"]("hide");
    shippingInputs.attr("disable", !this.checked);
    $("#firstNameShip").focus();
  });

  // Price Calculator

  $("#numShirts").change(function(){
    var selectedQty = $(this).val();
    //alert(selectedQty);
    var price = 20;
    var total = parseInt(selectedQty)*price;
    //alert(total);
    $("#total").val("$" + total);
  });
});


// Letters Only Validation

$.validator.addMethod( "lettersonly", function( value, element ) {
   return this.optional(element) || /^[a-z]+$/i.test( value );
  }, "Letters only please" );

// US states abbreviation Validation

  $.validator.addMethod( "stateUS", function( value, element, options ) {
	var isDefault = typeof options === "undefined",
		caseSensitive = ( isDefault || typeof options.caseSensitive === "undefined" ) ? false : options.caseSensitive,
		includeTerritories = ( isDefault || typeof options.includeTerritories === "undefined" ) ? false : options.includeTerritories,
		includeMilitary = ( isDefault || typeof options.includeMilitary === "undefined" ) ? false : options.includeMilitary,
		regex;

	if ( !includeTerritories && !includeMilitary ) {
		regex = "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	} else if ( includeTerritories && includeMilitary ) {
		regex = "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	} else if ( includeTerritories ) {
		regex = "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	} else {
		regex = "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	}

	regex = caseSensitive ? new RegExp( regex ) : new RegExp( regex, "i" );
	return this.optional( element ) || regex.test( value );
}, "Please specify a valid state" );

// Zip Code Validation

$.validator.addMethod( "zipcodeUS", function( value, element ) {
	return this.optional( element ) || /^\d{5}(-\d{4})?$/.test( value );
}, "The specified US ZIP Code is invalid" );

// Credit card validation

$.validator.addMethod( "creditcard", function( value, element ) {
	if ( this.optional( element ) ) {
		return "dependency-mismatch";
	}

	if ( /[^0-9 \-]+/.test( value ) ) {
		return false;
	}

	var nCheck = 0,
		nDigit = 0,
		bEven = false,
		n, cDigit;

	value = value.replace( /\D/g, "" );


	if ( value.length < 13 || value.length > 19 ) {
		return false;
	}

	for ( n = value.length - 1; n >= 0; n-- ) {
		cDigit = value.charAt( n );
		nDigit = parseInt( cDigit, 10 );
		if ( bEven ) {
			if ( ( nDigit *= 2 ) > 9 ) {
				nDigit -= 9;
			}
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return ( nCheck % 10 ) === 0;
}, "Please enter a valid credit card number." );
