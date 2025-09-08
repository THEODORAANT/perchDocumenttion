---
title: Subscription form
nav_groups:
  - primary
---

One you have connected the app with your lists, you may want to add a form to your site to enable site visitors to subscribe. To do this, you need to create a form template.

If it doesn't exist, create the template `templates/emailoctopus/forms/subscribe.html` with something like the following:

```html
<perch:form id="subscribe" app="perch_emailoctopus" double-optin="true">
	<perch:success>
		<p>Thank you!</p>
	</perch:success>
	<div>
		<perch:label for="email">Email</perch:label>
		<perch:input id="email" required type="email" mailer="email">
		<perch:error type="required" for="email">Required</perch:error>
	</div>
	<div>
		<perch:label for="firstname">First name</perch:label>
		<perch:input id="firstname" required type="text" mailer="FNAME">
		<perch:error type="required" for="firstname">Required</perch:error>
	</div>
	<div>
		<perch:label for="lastname">Last name</perch:label>
		<perch:input id="lastname" required type="text" mailer="LNAME">
		<perch:error type="required" for="lastname">Required</perch:error>
	</div>
	<div>
		<perch:input type="submit" value="Submit" id="btnsubmit">
		<perch:input type="hidden" value="1" id="confirm" mailer="confirm_subscribe">
		<perch:input type="hidden" id="list" value="your list ID goes here" mailer="list">
	</div>
</perch:form>
```

An important point is that the opening form tag has `app="perch_emailoctopus"` - this indicates to Perch that the content from this form should be directed to the Emailoctopus app to process.

### Setting `mailer` attributes

Use the `mailer` attribute on form fields to indicate to the EmailOctopus app which field in your form you want to serve which purpose.

|`mailer` value|Purpose|
|--|--|
|`list`|The ID of the list to subscribe to|
|`email`|The field containing the user's email address (required)|
|`FNAME`|The user's first name.|
|`LNAME`|The user's last name.|
|`confirm_subscribe`|The field indicating that the user has opted in.|




### Setting which list to subscribe to

At the bottom of the template is a hidden field with the ID `list`. The value of this field needs to be the ID value you can find listed under Lists within the Email Octopus app in the Perch control panel. This is how we know which list to subscribe the user to.

If you wish to give the user the option of subscribing to multiple lists, you can do that with checkboxes, for example:

```html
<div>
	<perch:label for="list-newsletter">Newsletter</perch:label>
	<perch:input id="list-newsletter" type="checkbox" value="abc123" mailer="list">
</div>
<div>
	<perch:label for="list-offers">Special offers</perch:label>
	<perch:input id="list-offers" type="checkbox" value="def456" mailer="list">
</div>
```

Here we give each checkbox field its own ID as usual. The `value` attribute of each checkbox should be its list ID from the control panel, and you should set the `mailer="list"` attribute.

Note that Email Octopus generally discourages the use of multiple lists to segment users. They recomment that it's better to have one list and use tools like groups to segment within that list.

### Confirming the subscription

Many territories require you to ask the user to actively opt-in to receiving emails. This is done using the `confirm_subscribe` field. If you don't need this functionality, you can leave it as a hidden field:

```html
<perch:input type="hidden" value="1" id="confirm" mailer="confirm_subscribe">
```

If you do want it, turn it into a checkbox instead:

```html
<perch:input type="checkbox" value="1" id="confirm" mailer="confirm_subscribe">
```

Unless the `confirm_subscribe` field is sent with a positive value, the app won't attempt to subscribe the user to the list.



## Displaying your form

Once you have the form template all set up, it's just a case of adding it to your page:

```php
<?php perch_emailoctopus_form('forms/subscribe'); ?>
```

## Subscribing from other forms

You don't need to use a dedicated form just to subscribe users to your list. You can add the functionality to an existing form, such as a contact form. To do that, make sure you've added the appropriate `list` and `mailer` values to the template, and then update the form's `app` attribute to also send the value to Email Octopus:

```html
<perch:form id="contact" app="perch_emailoctopus perch_forms">
   ...
</perch:form>
```

The apps will execute in order so if you are doing a redirect then put the perch_emailoctopus app first in the list so that processing happens before your form kicks in.
