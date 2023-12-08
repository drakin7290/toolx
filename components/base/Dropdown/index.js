import clsx from 'clsx';
import { nanoid } from 'nanoid'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import SvgDropdown from '~/public/assets/svgs/Dropdown';

const Dropdown = ({ options = [], ...prop }, ref) => {
    const [index, setIndex] = useState(0);
    const [value, setValue] = useState('');

    const [open, setOpen] = useState(false);

    const parent = useRef();
    const selectRef = useRef();


    useImperativeHandle(ref, () => ({
        selectedText: options?.length > 0 ? options[index]?.text : '',
        selectedValue: value,
        selectedIndex: index,
        changeSelectedIndex(i) {
            console.log(i, i < options?.length && i >= 0);
            if (i < options?.length && i >= 0) {
                setIndex(i)
            }
        }
    }))


    useEffect(() => {
        function click(e) {
            if (!parent.current.contains(e.target)) {
                setOpen(false)
            }
        }
        window.addEventListener('click', click);
        return () => {
            window.removeEventListener('click', click);
        }
    }, [])

    useEffect(() => {
        setValue(options[index]?.value)
        if (prop?.onChange) {
            prop.onChange(selectRef.current);
        }
    }, [index])

    return (
        <div className={clsx('relative', prop?.className)} ref={parent}>
            <select ref={selectRef} className={
                `absolute scale-0 opacity-0 select-none pointer-events-none`
            } value={value} onChange={(e) => {
                setIndex(e.currentTarget.selectedIndex)
            }} {...prop} >
                {
                    options?.map((item) => {
                        return <option key={nanoid()} value={item?.value}>{item?.text}</option>
                    })
                }
            </select>
            <div className='px-[24px] py-[12px] border-[1px] border-solid border-[#fff] rounded-full flex items-center gap-2 cursor-pointer select-none'
                onClick={() => {
                    setOpen(prev => !prev)
                }}
            >
                <span className='text-[16px] text-white'>{options[index]?.text}</span>
                <SvgDropdown className="w-[20px] h-[20px]" />
            </div>
            <div className={
                `absolute border-[1px] border-solid border-white rounded-[12px] flex flex-col left-0 top-[calc(100%+6px)] right-0 w-full overflow-hidden
                    transition-all duration-300 origin-top
                    ${open ? 'scale-100' : 'scale-0'}
                    ${open ? 'opacity-100' : 'opacity-0'}
                `
            }>
                {
                    options?.map((item, index) => {
                        return <span key={nanoid()} className={clsx('text-white px-4 py-2 border-solid border-gray-600 select-none cursor-pointer hover:bg-gray-800', {
                            ['border-b-[1px]']: index < options?.length - 1
                        })}
                            onClick={() => {
                                setIndex(index)
                                setOpen(false)
                            }}
                        >{item?.text}</span>
                    })
                }
            </div>
        </div>
    )
}

export default forwardRef(Dropdown)