# GitHub Source Control Integration

Under [Extensions](https://manage.auth0.com/#/extensions) you'll find the GitHub Deploy extension which allows you to manage your Database Connections and Rules in a GitHub repository.

## Deploying Pages

For Hosted Pages you'll created an html file and a json file (for enabled/disabled status) under `pages`. Supported hosted pages:


```
error_page
guardian_multifactor
login
password_reset
```

## Deploying Database Connection Scripts

For Database Connections you create a directory under `database-connections` which contains the name of your Database Connection (in exactly the same way as you named it in Auth0). And under this directory you'll create 1 file for every script you want to use. Only the `login` script is required in a Custom Database connection. If you enabled the migration feature, you'll also need to provide the `get_user` script.

Allowed scripts:

```
get_user.js
create.js
verify.js
login.js
change_password.js
delete.js
```

An example can be found [here](database-connections/my-custom-db).

##  Deploying Rules

For rules you'll create 1 JavasSript file for every rule you want to deploy under the `rules` directory. Eg: `rules/set-country.js`.

When creating the rule the name in Auth0 will be set to `set-country`. If you plan to use Source Control integration for an existing account, make sure you rename your rules in Auth0 first to the same name of the files you'll deploy to this directory.

In addition to that you might want to control the rule **order**, **status** (enabled/disabled) and **stage** (ENUM value: `login_success`, `login_failure`, `pre_authorize`).

These can be controlled by creating a JSON file next to your Javascript file. Eg:

**set-country.js**

```js
function (user, context, callback) {
	if (context.request.geoip) {
		user.country = context.request.geoip.country_name;
	}

	callback(null, user, context);
}
```

**set-country.json**

```json
{
  "enabled": false,
  "order": 15,
  "stage": "login_success"
}
```

> Note:
>  - Having multiple rules with the same order is not allowed. Make sure you don't have any collisions.

A few examples can be found [here](rules).
