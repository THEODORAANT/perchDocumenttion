---
title: Display Announcements
nav_groups:
  - primary
---

To display the announcements (on your `/announcements` page perhaps), use:
```php
 perch_announcements_custom(array(
              'template' => 'announcements_in_list.html'
          ));

```


To display a single announcement use:
```php
perch_by_announcement(perch_get('s'));

```
