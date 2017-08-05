import Ember from 'ember';
/* eslint-disable no-invalid-this */

const _0 = 0;
const _1 = 1;
const _2 = 2;
const _3 = 3;

const CHAR_NULL = 0;
const CHAR_DOT = 46;
const CHAR_ZERO = 48;
const CHAR_NINE = 57;
const CHAR_LEFT_ARROW = 37;
const CHAR_UP_ARROW = 38;
const CHAR_RIGHT_ARROW = 39;
const CHAR_DOWN_ARROW = 40;
const CHAR_SHIFT = 16;
const CHAR_PG_UP = 33;
const CHAR_PG_DOWN = 34;
const CHAR_HOME = 35;
const CHAR_END = 36;

export default Ember.TextField.extend({
	type: 'text',
	comma: true,
	float: false,
	attributeBindings: ['type', 'comma', 'float'],
	notAllowedKeys: [CHAR_LEFT_ARROW, CHAR_UP_ARROW, CHAR_RIGHT_ARROW, CHAR_DOWN_ARROW, CHAR_HOME, CHAR_END],

	addComma(inputValue){
		return String(inputValue).split( /(?=(?:\d{3})+(?:\.|$))/g ).join( ',' );
	},
	removeNonNumericChars(inputValue){
		return inputValue.replace(/[^0-9.]/g, '');
	},

	didInsertElement: function() {
		let self = this;

		this.$().focusout(function() {
			let currentValue = (self.value===undefined) ? '' : self.value;
			let txtValue = self.removeNonNumericChars(currentValue);

			if(txtValue.length > _0 && self.float) {
				let firstIndexOfDOT = currentValue.indexOf('.') ;
				if(txtValue.length > _0 && firstIndexOfDOT > _0) {
					txtValue = parseFloat(txtValue).toFixed(_2).toString();
				}
			}
			else if(txtValue.length > _0) {
				txtValue = parseInt(txtValue).toString();
			}

			if(self.comma) {
				txtValue = self.addComma(txtValue);
			}

			self.$().val(txtValue);
		});

		this.$().keypress(function(key) {

			if(!self.float && key.charCode === CHAR_DOT) {
				return false;
			}

			let cursorPosition = self.element.cursor;
			let currentValue = (self.value===undefined) ? '' : self.value;

			let firstIndexOfDOT = currentValue.indexOf('.') ;

			//0.00 dont allow to type after two decimal precesion
			if(firstIndexOfDOT >= _0 && currentValue.length === (firstIndexOfDOT + _3) && !(cursorPosition <= firstIndexOfDOT)) {
				return false;
			}
			if(firstIndexOfDOT >= _0 && key.charCode === CHAR_DOT) {
				return false;
			}

			// avoid first time DOT ==> .1 instead of 0.1
			if(currentValue.length === _0 && key.charCode === CHAR_DOT) {
				return false;
			}

            //avoid typing 0 in front of number starting except first 0 as we want 0.5 need to be allowed
			if((!cursorPosition || cursorPosition === _0 ) && key.charCode === CHAR_ZERO && currentValue.length !== _0) {
				return false;
			}

			if( key.charCode !== CHAR_NULL && key.charCode !== CHAR_DOT && (key.charCode < CHAR_ZERO || key.charCode > CHAR_NINE)) {
				return false;
			}
			return key;

		});

		this.$().keyup(function(key) {

			if(key.which===CHAR_SHIFT || key.which===CHAR_PG_UP || key.which===CHAR_PG_DOWN ) {
				return false;
			}

			let cursorPosition = self.element.selectionStart;
			let currentValue = (self.value===undefined) ? '' : self.value;

			if( !( self.notAllowedKeys.includes(key.which) ) ) {

				let previousCommaCount = (currentValue.split(',').length - _1);
				let txtValue = self.removeNonNumericChars(currentValue);

				let firstIndexOfDOT = txtValue.indexOf('.') ;

                //Remove trailing 0 if DOT is not present
				if(txtValue.length > _1 && (firstIndexOfDOT === -_1) ) {
					txtValue = parseInt(txtValue).toString();
				}
				else {
					let part = txtValue.split('.')[_1];
					if(txtValue.length !== _1 && !(txtValue.length === firstIndexOfDOT + _1) && !(part === '0')) {
						txtValue = parseFloat(txtValue).toString();
					}
				}

				if( firstIndexOfDOT > _0 && (txtValue.length > (firstIndexOfDOT + _3)) ) {
					txtValue = parseFloat(txtValue).toFixed(_2).toString();
				}

				let formattedNumber = txtValue;
				let commaAddedNuber = formattedNumber;

				if(self.comma) {
					commaAddedNuber = self.addComma(formattedNumber);
				}

				let afterCommaCount = (commaAddedNuber.split(',').length - _1);
				self.$().val(commaAddedNuber);

				let commaAddedOrNot = afterCommaCount-previousCommaCount;
				if(commaAddedOrNot) {
					cursorPosition = cursorPosition + commaAddedOrNot;
				}
			}
			self.element.cursor = cursorPosition;
			self.element.selectionStart = cursorPosition;
			// handles shift + arrow key selection of text input feature for number as well
			if(key.shiftKey) {							
				self.element.selectionEnd = self.element.selectionEnd  + ( self.notAllowedKeys.includes(key.which) ? _0 : _1 );
			}
			else {
				self.element.selectionEnd = self.element.selectionStart;
			}
		});
	}
});