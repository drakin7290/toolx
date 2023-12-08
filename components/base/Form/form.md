# Prop inputs

```jsx
[
    [
        {
            name: 'password',
            type: 'password',
            props: {
                id: '...',
                style: '...',
                ...
            }
        }
    ],
    [
        {
            name: 'password',
            type: 'password',
            props: {
                id: '...',
                style: '...',
                ...
            }
        },

        {
            name: 'password',
            type: 'password',
            props: {
                id: '...',
                style: '...',
                ...
            }
        },
    ]
]
```

# demo an Input in inputs

```jsx
{
    name: 'password',
    type: 'password',
    label: 'Password',
    props: {
        id: '...',
        style: '...',
        ...
    },
    required: true,
    validates: {
        isEmail: false,
        isPhone: false,
        maxLength: 6, //default: infinity
        minLength: 0,
        leastSpecialChar: false,
        leastUpChar: 0,
    }
}
```
