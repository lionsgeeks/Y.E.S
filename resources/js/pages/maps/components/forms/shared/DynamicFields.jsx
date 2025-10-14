import React from 'react'

function pickInputType(sqlType, name) {
    const t = sqlType || ''
    const lowerName = (name || '').toLowerCase()
    if (lowerName.includes('email')) return 'email'
    if (lowerName.includes('url') || lowerName.includes('website') || lowerName.includes('site_web')) return 'url'
    if (lowerName.includes('phone') || lowerName.includes('telephone')) return 'tel'
    if (t.includes('int') || t.includes('numeric') || t.includes('decimal')) return 'number'
    if (t.includes('bool') || lowerName.startsWith('is_')) return 'checkbox'
    return 'text'
}

export default function DynamicFields({ columns = [], values = {}, setValues, exclude = [] }) {
    if (!columns.length) return null
    const handle = (key, val, type) => {
        if (type === 'checkbox') {
            setValues && setValues((p) => ({ ...p, [key]: !p[key] }))
            return
        }
        setValues && setValues((p) => ({ ...p, [key]: val }))
    }
    const filtered = columns.filter((meta) => {
        const name = typeof meta === 'string' ? meta : meta.name
        return !exclude.includes(name)
    })
    if (!filtered.length) return null
    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((meta) => {
                const name = typeof meta === 'string' ? meta : meta.name
                const type = pickInputType((meta.type || ''), name)
                return (
                    <div key={name} className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">{name}</label>
                        {type === 'checkbox' ? (
                            <input type="checkbox" className="h-5 w-5" checked={!!values[name]} onChange={() => handle(name, null, 'checkbox')} />
                        ) : (
                            <input
                                type={type}
                                className="border rounded px-3 py-2"
                                value={values[name] ?? ''}
                                onChange={(e) => handle(name, e.target.value, type)}
                                placeholder={name}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}


