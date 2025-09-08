---
title: perch_announcements_custom()
addon: perch_announcements
nav_groups:
  - primary
---


The perch_announcements_custom function is very useful for displaying a specific list of announcements on a homepage for example.


## Requires

- the Announcements App installed.

## Parameters

| Type | Description |
|-|-|
| Array   | Options array, see table below |
| Boolean | Set to `true` to have the value returned instead of echoed. |



## Usage examples

 I have also passed in a custom template for this listing.

```php
<?php
perch_announcements_custom(array(
 
    'template' => 'special_listing.html',
));
?>
```
