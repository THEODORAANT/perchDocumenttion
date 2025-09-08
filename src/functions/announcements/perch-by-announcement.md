---
title: perch_by_announcement()
addon: perch_announcements
nav_groups:
  - primary
---

Display a single announcement with `perch_by_announcement()`.

The first argument must be either the ID of an announcement. 

## Requires

- The Announcements App installed

## Parameters

| Type | Description                                                 |
|-|-------------------------------------------------------------|
| Integer    | The ID of an announcement                                   |
| Boolean | Set to `true` to have the value returned instead of echoed. |

## Usage examples

Describe the example.

```php
<?php perch_by_announcement(perch_get('s')); ?>
```

The above will use the value of `?s=` on the URL to find the announcement. Announcements are shown using the `announcement.html` master template.

To return the value, pass `true` as the second argument.

```php
<?php $html = perch_by_announcement(perch_get('s'), true); ?>
```
