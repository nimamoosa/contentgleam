// MyButton.tsx

import { extendVariants, Input } from '@nextui-org/react'

export const InputUi = extendVariants(Input, {
    variants: {
        color: {
            primary: {
                inputWrapper: 'bg-black',
                input: '#FFF'
            }
        }
    },
    defaultVariants: {
        color: 'primary'
    }
})
