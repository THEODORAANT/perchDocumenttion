---
title: Klarna
nav_groups:
  - primary
---

*Gateway slug:* `klarna`

These are instructions for Klarna payments.

## Settings

Klarna is available to the following countries:
```
Australia, Austria,Belgium, Canada,Czech Republic,Denmark",Finland,France,Germany,Greece,Hungary,Ireland (Republic of Ireland)
,Italy,Mexico,Netherlands,New Zealand,Norway,Poland,Portugal,Romania,Slovakia,Spain, Sweden,  Switzerland,United Kingdom, United States
```
In your `perch/config/shop.php` file, add your settings for Klarna.

```php
<?php
  return [
    'gateways' => [
      'klarna' => [
        'enabled'   => true,
        'test_mode' => true,
        'live' => [
            'secret_key'      => 'klarna_api_secret',
             'publishable_key' => 'klarna_api_key',
             'merchantId' =>  'klarna_api_merchant_id',

        ],
        'test' => [
         
            'secret_key'      => 'klarna_api_secret',
             'publishable_key' => 'klarna_api_key',
             'merchantId' =>  'klarna_api_merchant_id',

        ],
      ],
    ],
  ];
?>
```


## Getting your Klarna test credentials

To start testing with klarna, you need to create an account in the Klarna Playground, and then get API credentials for that account. These go into your Shop config file.

Once you’ve registered your Klarna Merchant Account, you can get test credentials by following these steps:

1.Log in to your Klarna Merchant Portal.

2.Navigate to the API or Integration section (it may be called "Developers" or similar).

3.You will see a section for API credentials where you can find your test credentials.
Typically, these test credentials consist of:

-API Key  – A unique key used to authenticate API requests.
-Secret Key – The secret key used to sign API requests.
-Merchant ID – A unique ID for your Klarna Merchant account.


Copy that api key , Secret and Merchant ID into the `test` section of the Shop config file.

When you’re [ready to go live](https://developer.paypal.com/docs/classic/lifecycle/goingLive/), your client can log into the Klarna account money is to be paid into and obtain a set of [live credentials](https://www.paypal.com/us/cgi-bin/webscr?cmd=_profile-api-signature) directly from PayPal.

## Payment flow

The process for Klarna goes like this:

1. You call `perch_shop_checkout()` and the user gets sent to Klarna to make the payment
2. The user gets sent back to a page on your site with a `klarna_order_id` in the URL
3. You need to then call `perch_shop_klarna_confirm_payment()` to take that klarna_order_id and complete the payment (the user says on your page)

### Step 1: Initiating checkout

```php
<?php
if (perch_member_logged_in()) {


 //URL for the terms and conditions page of the merchant. 
 //The URL will be displayed inside the Klarna Checkout iFrame.
 $terms_url = 'https://yourstore.com/terms';
 
 //URL for the checkout page of the merchant.
 $checkout_url = 'https://yourstore.com/checkout';
 
 //URL of the merchant confirmation page. klarna_order_id placeholder is mandatory!
 $confirmation_url = 'https://yourstore.com/payment?klarna_order_id={checkout.order.id}';

  perch_shop_checkout('klarna', [
    'terms_url' => $terms_url,
    'checkout_url' => $checkout_url,
    'confirmation_url'=> $confirmation_url,
  ]);
}
?>
```


### Step 2: The user goes off to Klarna


If the payment is authorised at Klarna, the user will be returned to the `confirmation_url` - your 'payment' page.

### Step 3: Confirm payment
The user will be redirected back to the `confirmation_url` page if the authorization is successful after the customer clicks on the ‘Place Order’ button inside checkout.
 Perch Shop will pick up the order id automatically - all you need to do is call `perch_shop_klarna_confirm_payment()` .

```php
<?php
  
 $success_url= '/payment/success';
 $cancel_url = '/payment/went/wrong';

perch_shop_klarna_confirm_payment([
   'success_url' => $success_url,
      'cancel_url'=> $cancel_url   ]);
?>
```

## Troubleshooting

### Failed payments

While getting your shop set up, it's likely you might see some issues processing payments until everything is configured just right. 
Shop outputs any payment gateway errors into its debug console. Turning on debug mode will enable you to see this output.

One issue you may need to combat is the payment process redirecting the browser before you can see the debug console. To solve that, we have instruct Perch to hold any redirects.

1. [Enabled debug](/docs/installing-perch/configuration/debug/) for your page.
2. Before your call to `perch_shop_checkout()` add: `PerchUtil::hold_redirects();`

You should then be able to see any error messages. 
They may be verbose! Often the part of the message that is most useful is in red near the end.

Also on merchant portal Developer logs capture each step.
