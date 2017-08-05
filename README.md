# mn-numeric-input

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd mn-numeric-input`
* `npm install`
* `bower install`

## Easy to use
* Simple to use, after installation we can specify like following:

* `{{mn-numeric-input}}`
    No configuration provided so it will allow only numbers & automatically append comma
* `{{mn-numeric-input comma=false}}`
    Comma setting is false so it will allow only numbers & comma will not be added automatically
* `{{mn-numeric-input float=true}}`
    Float setting specifies that user can enter one dot & will accpet numbers after decimal upto 2 decimal(time being decided to keep it for 2 places only). Comma will be added automatically once user start filling number & behave accordingly
* `{{mn-numeric-input float=true comma=false}}`
    Same as above but there will be no comma appended to it

* When you hit save it will save the value including comma(if not disabled comma setting)    


## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
