import { createEvent, createStore } from 'effector'
export const $firstValue = createStore<string>('')
export const $operation = createStore<string>('')
export const $secondValue = createStore<string>('')
export const $result = createStore<number | null>(null)
export const $history = createStore<string[]>([])

export const changeOperation = createEvent<string>()
export const changeFirstValue = createEvent<string>()
export const changeSecondValue = createEvent<string>()
export const createResult = createEvent()
export const clearCalc = createEvent()
export const addHistory = createEvent()

$history.on(addHistory, (store: string[]) => {
    store.push(
        `${$firstValue.getState()} ${$operation.getState()} ${$secondValue.getState()} = ${$result.getState()}`
    )
    return store
})
$firstValue.on(changeFirstValue, (store, val) => store + val).reset(clearCalc)
$secondValue.on(changeSecondValue, (store, val) => store + val).reset(clearCalc)
$operation.on(changeOperation, (store, val) => val).reset(clearCalc)

$result
    .on(createResult, store => {
        store = eval(
            `${$firstValue.getState()} ${$operation.getState()} ${$secondValue.getState()}`
        )
        return store
    })
    .reset(clearCalc)
