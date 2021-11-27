import React, { useReducer,useState,useEffect } from 'react'

const getlocalitems = () => {
   return (localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')): [])
}
var initialstate = getlocalitems()
function reducer(state,{type,payload}) {
    switch (type) {
			case 'add': {
				return [
					...state,
					{
						name: payload.name,
						completed: false,
						id: payload.id,
						remove: false,
					},
			]
			}
			case 'del': {
				return state.map((item) => {
					if (item.id == payload.id) {
						return { ...item, completed: !item.completed }
					}
					return item
				})
			}
		case 'remove': {
			return state.filter((el) =>!(payload.checked).includes(el.id))
		}
			
			
			case 'Delete All': {  
			return state = [];
			}
			case 'default': {
			return state
			}
		}
}
function Reducer() {
    const [state, dispatch] = useReducer(reducer, initialstate);
    const [newa, setnew] = useState("");
    const [checked, setchecked] = useState([])
    useEffect(() => {
		localStorage.setItem('list', JSON.stringify(state))
		return ()=>{}
    }, [state])
    
    
    return (
			<div>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						setnew('')
					}}
				>
					<input
						type='text'
						value={newa}
						onChange={(e) => setnew(e.target.value)}
					></input>
					<input
						type='submit'
						onClick={() => {
							return newa != ''
								? dispatch({
										type: 'add',
										payload: { name: newa, id: Date.now() },
								  })
								: ''
						}}
					></input>
					<button
						onClick={() => {
							dispatch({ type: 'remove', payload: { checked } })
						}}
					>
						Remove
					</button>
					<button
						onClick={() => {
							dispatch({ type: 'Delete All' })
						}}
					>
                    Clear List
					</button>
			</form>

			{/* CODE STARTS 			 */}
			
				<div style={{ cursor: 'Pointer' }}>
					{state.map((item) => {
						return (
							<div
								key={item.id}
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<h1
									style={
										item.completed
											? { textDecorationLine: 'line-through' }
											: { backgroundColor: 'white' }
									}
									onClick={() => {
										dispatch({
											type: 'del',
											payload: { id: item.id },
										})
									}}
								>
									{item.name}
								</h1>
								<input
									type='checkbox'
									onChange={() => {
										setchecked([...checked, item.id])
									}}
								></input>
							</div>
						)
					})}
				</div>
			</div>
		)
}

export default Reducer
