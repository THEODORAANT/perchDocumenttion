---
title: Fixing affiliate payout invoices
nav_groups:
  - primary
---

When the Members app affiliate tools generate a payout invoice they load the payout record and convert it into an array before passing the data on to the template. If the payout can’t be loaded the `find()` method returns `false`. Calling `to_array()` on that value triggers the PHP fatal error:

```
Fatal error: Uncaught Error: Call to a member function to_array() on bool
```

This happens when an invalid or missing payout ID is used. It can also happen when the payout has already been removed. The fix is to check the return value before calling `to_array()` and handle the problem gracefully.

## Guarding against missing payouts

Update `perch/addons/apps/perch_members/affiliates/payouts/generate_invoice/index.php` so it validates the payout before using it. The important lines are just before the call to `to_array()`.

```php
$Payout = $Payouts->find($payoutID);

if (!$Payout) {
    PerchUtil::redirect($API->app_path().'/payouts/?msg=payout404');
}

$details = $Payout->to_array();
```

If your project already uses a message stack you can replace the redirect with a failure message and then return early. The crucial point is that the code never calls `to_array()` unless the payout was successfully loaded.

## What to check when the error persists

1. Make sure the payout ID being passed in the query string still exists.
2. Confirm the logged-in user has permission to view the payout; otherwise the finder returns `false`.
3. Clear any cached affiliate invoices – a stale link can point at a deleted payout.

Once the guard is in place the invoice page should either load correctly or give a clear message instead of a fatal error.
